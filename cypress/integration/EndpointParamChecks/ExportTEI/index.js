import '../common/settingFormValues'
import { Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps'

const programsApi = /api\/\d{2}\/programs\?fields=id,displayName&paging=false/
const orgUnitsFirstLevelApi = /api\/\d{2}\/organisationUnits\/ImspTQPwCqd\?fields=children\[id,displayName,path,children::isNotEmpty\]&paging=false/
const orgUnitsRootApi = /api\/\d{2}\/organisationUnits\?filter=level:eq:1&fields=id,path,displayName,children::isNotEmpty&paging=false/
const trackedEntityTypesApi = /api\/\d{2}\/trackedEntityTypes\?fields=id,displayName&paging=false/
const usersApi = /api\/\d{2}\/users\?fields=id,displayName&paging=false/
const trackedEntityInstancesApi = /api\/\d{2}\/trackedEntityInstances/

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

    cy.route({
        url: trackedEntityInstancesApi,
        status: 404,
        response: {},
    }).as('downloadXHR')
})

Given('the user is on the tracked entity instances export page', () => {
    cy.visitPage('export', 'tei')
})

const sierraId = 'ImspTQPwCqd'
Given('the Sierra Leone org unit has been selected', () => {
    cy.get(`[data-test="input-org-unit-tree-tree-/${sierraId}"] label`).click()
    cy.get('@defaultData').then(defaultData => {
        cy.wrap({ ...defaultData, ou: sierraId }).as('defaultData')
    })
})

Given('the user expands the root level of the org unit tree', () => {
    cy.get(`[data-test="input-org-unit-tree-tree-/${sierraId}-toggle"]`).click()
})

const boId = 'O6uvpzGd5pu'
When('the user selects the "Bo" org unit', () => {
    cy.get(
        `[data-test="input-org-unit-tree-tree-/${sierraId}/${boId}"] label`
    ).click()

    cy.get('@defaultData').then(defaultData => {
        const ou = `${defaultData.ou};${boId}`
        cy.wrap({ ...defaultData, ou }).as('defaultData')
    })
})

Then('the download request is sent with the right parameters', () => {
    cy.wait('@downloadXHR').then(xhr => {
        cy.getComparisonData(xhr.url).then(
            ({ actual, expected: allExpected }) => {
                const {
                    compression,
                    teiTypeFilter,
                    lastUpdatedFilter,
                    ...expected
                } = allExpected
                expect(actual).to.deep.equal(expected)
            }
        )
    })
})
