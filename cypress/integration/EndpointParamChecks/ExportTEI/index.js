import '../common/settingFormValues'
import { Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps'

const programsApi = /\/programs\?fields=id,displayName&paging=false/
const orgUnitsFirstLevelApi =
    /\/organisationUnits\/ImspTQPwCqd\?fields=children\[id,displayName,path,children::isNotEmpty\]&paging=false/
const orgUnitsRootApi =
    /\/organisationUnits\?filter=level:eq:1&fields=id,path,displayName,children::isNotEmpty&paging=false/
const trackedEntityTypesApi =
    /\/trackedEntityTypes\?fields=id,displayName&paging=false/
const usersApi = /\/users\?fields=id,displayName&paging=false/
const trackedEntityInstancesApi = /\/trackedEntityInstances/

Before(() => {
    cy.server()

    cy.stubWithFixture({
        url: programsApi,
        fixture: 'programs',
    }).as('programsXHR')

    cy.stubWithFixture({
        url: trackedEntityTypesApi,
        fixture: 'trackedEntityTypes',
    }).as('trackedEntityTypesXHR')

    cy.stubWithFixture({
        url: usersApi,
        fixture: 'users',
    }).as('usersXHR')

    cy.stubWithFixture({
        url: orgUnitsRootApi,
        fixture: 'orgUnitsRoot',
    }).as('orgUnitsRootXHR')

    cy.stubWithFixture({
        url: orgUnitsFirstLevelApi,
        fixture: 'orgUnitsFirstLevel',
    }).as('orgUnitsFirstLevelXHR')

    cy.intercept(trackedEntityInstancesApi, {
        statusCode: 404,
        body: '',
    }).as('downloadXHR')
})

Given('the user is on the tracked entity instances export page', () => {
    cy.visitPage('export', 'TEI')
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

Given('the user expands the root level of the org unit tree', () => {
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

Then('the download request is sent with the right parameters', () => {
    cy.window().then((win) => {
        expect(win.open).to.be.calledOnce
        const requestUrl = win.open.getCall(0).args[0]

        cy.getComparisonData(requestUrl).then(
            ({ actual, expected: allExpected }) => {
                const {
                    // omit values that are not send to the endpoint
                    teiTypeFilter,
                    lastUpdatedFilter,
                    assignedUserModeFilter,

                    // values that might be sent only if they're not empty
                    programStatus,
                    assignedUser,

                    // values that need a different key
                    orgUnit,
                    ...rest
                } = allExpected

                const expected = {
                    ...rest,
                    ...(rest.orgUnitMode === ':MANUAL:'
                        ? { ou: orgUnit.replace(',', ';') }
                        : {}),
                    ...(programStatus !== '' ? { programStatus } : {}),
                    ...(assignedUser
                        ? { assignedUser: assignedUser.join(';') }
                        : {}),
                    orgUnitMode:
                        rest.orgUnitMode === ':MANUAL:'
                            ? 'SELECTED'
                            : rest.orgUnitMode,
                }

                const expectedEntries = Object.entries(expected)

                for (const [name, value] of expectedEntries) {
                    expect(actual[name]).to.deep.equal(value)
                }
            }
        )
    })
})
