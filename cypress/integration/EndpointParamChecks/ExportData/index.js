import '../common/settingFormValues'
import { Before, Given } from 'cypress-cucumber-preprocessor/steps'

const dataSetsApi = /api\/dataSets\?fields=id,displayName&paging=false/
const orgUnitsFirstLevelApi = /api\/organisationUnits\?filter=id:in:[ImspTQPwCqd]&fields=:all,displayName,path,children[id,displayName,path,children::isNotEmpty]&paging=false&format=json/
const orgUnitsRootApi = /api\/organisationUnits\?fields=id,path,displayName,children::isNotEmpty&level=1&paging=false/
const schemasApi = /api\/schemas.json\?fields=metadata,collectionName,displayName,klass/
const dataApi = /api\/dataValueSets\.(json|xml|csv)/

Before(() => {
    cy.server()

    cy.stubWithFixture({
        url: dataSetsApi,
        fixture: 'dataSets',
    }).as('dataSetsXHR')

    cy.stubWithFixture({
        url: orgUnitsRootApi,
        fixture: 'orgUnitsRoot',
    }).as('orgUnitsRootXHR')

    cy.stubWithFixture({
        url: orgUnitsFirstLevelApi,
        fixture: 'orgUnitsFirstLevel',
    }).as('orgUnitsFirstLevelXHR')

    cy.route({
        url: dataApi,
        status: 404,
        response: {},
    }).as('downloadXHR')
})

Given('the user is on the data export page', () => {
    cy.visitPage('export', 'data')
})

Given('the Sierra Leone org unit has been selected', () => {
    cy.get(
        '[data-test="input-org-unit-tree"] [class*="styles_text"]:contains("Sierra Leone")'
    ).click()

    cy.get('@defaultData').then(defaultData => {
        cy.wrap({ ...defaultData, orgUnit: 'ImspTQPwCqd' }).as('defaultData')
    })
})

Given('the first data set has been selected', () => {
    cy.get(
        '[data-test="input-data-sets"] svg + div:contains("ART monthly summary")'
    )
        .parent()
        .click()

    cy.get('@defaultData').then(defaultData => {
        cy.wrap({ ...defaultData, dataSet: 'lyLU2wR22tC' }).as('defaultData')
    })
})

Given('the user expands the root level of the org unit tree', () => {
    cy.get('[data-test="input-org-unit-tree"] [class*="styles_icon"]').click()
})

When('the user selects the "Bo" org unit', () => {
    cy.get(
        '[data-test="input-org-unit-tree"] [class*="styles_text"]:contains("Bo")'
    )
        .first()
        .click()

    cy.get('@defaultData').then(defaultData => {
        const orgUnit = Array.isArray(defaultData.orgUnit)
            ? [...defaultData.orgUnit, 'O6uvpzGd5pu']
            : [defaultData.orgUnit, 'O6uvpzGd5pu']

        cy.wrap({ ...defaultData, orgUnit }).as('defaultData')
    })
})

Given('all data sets have been selected', () => {
    cy.get('[data-test="input-data-sets"] [class*="styles_actionLabel"]')
        .first()
        .parent()
        .click()

    cy.get('@defaultData').then(defaultData => {
        cy.fixture('dataSets').then(({ dataSets }) => {
            const dataSet = dataSets.map(({ id }) => id)

            cy.wrap({ ...defaultData, dataSet }).as('defaultData')
        })
    })
})

Then('the download request is sent with the right parameters', () => {
    cy.wait('@downloadXHR').then(xhr => {
        cy.getComparisonData(xhr.url).then(
            ({ actual, expected: allExpected }) => {
                const { format, compression, ...expected } = allExpected
                expect(actual).to.deep.equal(expected)
            }
        )
    })
})
