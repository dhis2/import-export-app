import '../common/settingFormValues'
import {
    Before,
    Given,
    Then,
    When,
} from '@badeball/cypress-cucumber-preprocessor'

// @dhis2-ui/organisation-unit-tree (bundled inside @dhis2/ui, see
// OrgUnitTreeField.jsx's use of `OrganisationUnitTree`) fetches org unit
// data through several separate, narrower queries rather than one
// `id,displayName,path,children::isNotEmpty` call - see e.g.
// use-root-org-data.js, use-org-data.js and use-org-children.js in that
// package. These patterns are kept in sync with the installed version's
// actual query shapes (confirmed against node_modules/@dhis2-ui/
// organisation-unit-tree, pinned in yarn.lock).
//
// 1. The root ids: OrgUnitTreeField.jsx's own `rootQuery` only asks for
//    `id` (the roots are re-fetched individually afterwards).
const orgUnitsRootApi =
    /\/organisationUnits\?filter=level:eq:1&fields=id&paging=false/
// 2. Each root's own displayName/path (useRootOrgData) requests
//    `fields=displayName,path,id` - the only org-unit-tree query with no
//    "children" field at all, so exclude anything mentioning "children"
//    to keep this from swallowing #3/#4 below. (A real captured request
//    showed `@dhis2/app-runtime`'s data engine percent-encodes the `[`,
//    `]` and `,` delimiters in nested `fields` params - e.g. the real
//    "children list" request is .../organisationUnits/ImspTQPwCqd?fields=
//    children%5Bid%2Cpath%2CdisplayName%5D, not a literal
//    `children[id,path,displayName]` - so #2/#3/#4 are all matched on
//    which unencoded field *names* appear in the query, never on `[`/`]`/
//    `,` delimiter characters, and are kept mutually exclusive by
//    construction rather than relying on cy.intercept() registration
//    order to pick the "right" one out of several matches.)
const orgUnitNodeDetailApi =
    /\/organisationUnits\/[a-zA-Z0-9]+\?(?!.*children)/
// 3. Every rendered node's own child *count* (useOrgData, used for the
//    root and every expanded child) requests `fields=path,children`
//    (with or without a `::size` suffix) - has "children" but, unlike #4,
//    never "displayName".
const orgUnitNodeMetaApi =
    /\/organisationUnits\/[a-zA-Z0-9]+\?fields=path.*children(?!.*displayName)/
// 4. A node's list of *children* (useOrgChildren, fired on expand)
//    requests `fields=children[id,path,displayName]` - identified by
//    having both "children" and "displayName" in the field list.
const orgUnitsFirstLevelApi =
    /\/organisationUnits\/[a-zA-Z0-9]+\?fields=children.*displayName/
const programsApi = /\/programs\?/
const programStagesApi = /\/programs\/[a-zA-Z0-9]+/

Before(() => {
    cy.stubWithFixture({
        url: orgUnitsRootApi,
        fixture: 'orgUnitsRoot',
    }).as('orgUnitsRootXHR')

    // #2/#3/#4 are mutually exclusive by construction (see the comments
    // above each pattern) so registration order doesn't matter here.
    cy.stubWithFixture({
        url: orgUnitNodeDetailApi,
        fixture: 'orgUnitsRootDetail',
    }).as('orgUnitNodeDetailXHR')

    cy.stubWithFixture({
        url: orgUnitNodeMetaApi,
        fixture: 'orgUnitsNodeMeta',
    }).as('orgUnitNodeMetaXHR')

    cy.stubWithFixture({
        url: orgUnitsFirstLevelApi,
        fixture: 'orgUnitsFirstLevel',
    }).as('orgUnitsFirstLevelXHR')

    cy.stubWithFixture({
        url: programsApi,
        fixture: 'programs',
    }).as('programsXHR')

    cy.stubWithFixture({
        url: programStagesApi,
        fixture: 'programStages',
    }).as('programStagesXHR')
})

Given('the user is on the event export page', () => {
    cy.visitPage('export', 'Event')
    cy.wait('@programsXHR')
    cy.wait('@programStagesXHR')
})

const sierraId = 'ImspTQPwCqd'
Given('the Sierra Leone org unit has been selected', () => {
    cy.get(
        `[data-test="input-org-unit-tree"] [data-test="input-org-unit-tree-node-label"]:contains("Sierra Leone")`
    ).click()
    cy.get('@defaultData').then((defaultData) => {
        cy.wrap({ ...defaultData, orgUnit: sierraId }).as('defaultData')
    })
})

Given('the user expands the root level of the org unit tree', () => {
    cy.get('[data-test="input-org-unit-tree-node-toggle"]').first().click()
})

const boId = 'O6uvpzGd5pu'
When('the user selects the "Bo" org unit', () => {
    cy.get(
        `[data-test="input-org-unit-tree"] [data-test="input-org-unit-tree-node-label"]:contains("Bo")`
    )
        .filter((index, el) => Cypress.$(el).text().match(/Bo$/))
        .click()

    cy.get('@defaultData').then((defaultData) => {
        const orgUnit = `${boId}`
        cy.wrap({ ...defaultData, orgUnit }).as('defaultData')
    })
})

When('the export form is submitted', () => {
    cy.window().then((win) => {
        const locationAssignStub = cy.stub().as('locationAssign')
        win.locationAssign = locationAssignStub
        cy.get('[data-test="input-export-submit"]').click()
    })
})

Then('the download request is sent with the right parameters', () => {
    cy.window().then((win) => {
        cy.get('@locationAssign').then((locationAssignStub) => {
            expect(locationAssignStub).to.be.calledOnce
            const call = locationAssignStub.getCall(0)
            const url = call.args[0]

            cy.getComparisonData(url).then(
                ({ actual, expected: allExpected, allData }) => {
                    const {
                        inclusion,
                        programStages,
                        compression,
                        // format and compression are embedded in the URL's
                        // file extension (events.json.zip), not sent as
                        // query params, so they're excluded from `expected`
                        format,
                        ...expected
                    } = allExpected

                    /**
                     * The Event page has some (WTF) customizations.
                     * These are handled here:
                     */
                    const updatedExpected = {
                        ...expected,
                        paging: 'false',
                        totalPages: 'false',
                        orgUnitMode: inclusion.toUpperCase(),
                        programStage: programStages,
                    }

                    if (!updatedExpected.programStage) {
                        delete updatedExpected.programStage
                    }

                    console.log('actual', JSON.stringify(actual))
                    console.log(
                        'updatedExpected',
                        JSON.stringify(updatedExpected)
                    )
                    expect(actual).to.deep.equal(updatedExpected)
                }
            )
        })
    })
})
