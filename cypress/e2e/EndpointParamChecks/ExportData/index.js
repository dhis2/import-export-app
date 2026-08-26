import '../common/settingFormValues'
import {
    Before,
    Given,
    Then,
    When,
} from '@badeball/cypress-cucumber-preprocessor'

const dataSetsApi = /\/dataSets\?fields=id,displayName&paging=false/
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
const dataApi = /\/dataValueSets/

Before(() => {
    cy.stubWithFixture({
        url: dataSetsApi,
        fixture: 'dataSets',
    }).as('dataSetsXHR')

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

    cy.intercept(dataApi, {
        statusCode: 404,
        body: '',
    }).as('downloadXHR')
})

Given('the user is on the data export page', () => {
    cy.visitPage('export', 'Data')
})

const sierraId = 'ImspTQPwCqd'
Given('the Sierra Leone org unit has been selected', () => {
    cy.get(
        `[data-test="input-org-unit-tree"] label:contains("Sierra Leone")`
    ).click()
    cy.get('@defaultData').then((defaultData) => {
        cy.wrap({ ...defaultData, orgUnit: sierraId }).as('defaultData')
    })
})

Given('the first data set has been selected', () => {
    cy.fixture('dataSets').then(({ dataSets }) => {
        const [{ id, displayName }] = dataSets

        cy.get(
            `[data-test="input-data-set-picker"] [data-test="dhis2-uicore-transferoption"]:contains("${displayName}")`
        ).dblclick()

        cy.get('@defaultData').then((defaultData) => {
            cy.wrap({ ...defaultData, dataSet: id }).as('defaultData')
        })
    })
})

When('the user expands the root level of the org unit tree', () => {
    cy.get('[data-test="input-org-unit-tree-node-toggle"]').first().click()
})

const boId = 'O6uvpzGd5pu'
When('the user selects the "Bo" org unit', () => {
    cy.get(`[data-test="input-org-unit-tree"] label:contains("Bo")`)
        .filter((index, el) => Cypress.$(el).text().match(/Bo$/))
        .click()

    cy.get('@defaultData').then((defaultData) => {
        const orgUnit = `${defaultData.orgUnit},${boId}`
        cy.wrap({ ...defaultData, orgUnit }).as('defaultData')
    })
})

Given('all data sets have been selected', () => {
    cy.selectAllDataSets()
    cy.get('@defaultData').then((defaultData) => {
        cy.fixture('dataSets').then(({ dataSets }) => {
            const dataSet = dataSets.map(({ id }) => id).join(',')
            cy.wrap({ ...defaultData, dataSet }).as('defaultData')
        })
    })
})

When('the export form is submitted', () => {
    // The app checks for window.locationAssign as a test hook (see
    // src/utils/helper.js) and calls it with the download URL instead of
    // triggering a real navigation/download when it's stubbed. It doesn't
    // exist on window by default, so it must be defined before cy.stub can
    // wrap it.
    cy.window().then((win) => {
        win.locationAssign = () => {}
        cy.stub(win, 'locationAssign').as('locationAssignStub')
    })

    cy.get('[data-test="input-export-submit"]').click()
})

Then('the download request is sent with the right parameters', () => {
    cy.get('@locationAssignStub').should('have.been.calledOnce')

    cy.window().then((win) => {
        const requestUrl = win.locationAssign.getCall(0).args[0]

        // `format` isn't a query param - it's the download URL's file
        // extension (.../dataValueSets.<format>?...) - so it's checked
        // separately rather than via the parsed query string below.
        const [pathPart] = requestUrl.split('?')

        cy.getComparisonData(requestUrl).then(
            ({ actual, expected: allExpected }) => {
                const { compression, format, ...expected } = allExpected
                console.log('actual', actual)
                console.log('expected', expected)

                expect(pathPart).to.match(new RegExp(`\\.${format}$`))

                const expectedEntries = Object.entries(expected)
                for (const [name, value] of expectedEntries) {
                    expect(actual[name]).to.deep.equal(value)
                }
            }
        )
    })
})
