import '../common/settingFormValues'
import { Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps'

const dataSetsApi = /api\/\d{2}\/dataSets\?fields=id,displayName&paging=false/
const orgUnitsFirstLevelApi = /api\/\d{2}\/organisationUnits\/ImspTQPwCqd\?fields=children\[id,displayName,path,children::isNotEmpty\]&paging=false/
const orgUnitsRootApi = /api\/\d{2}\/organisationUnits\?filter=level:eq:1&fields=id,path,displayName,children::isNotEmpty&paging=false/
const schemasApi = /api\/\d{2}\/schemas.json\?fields=metadata,collectionName,displayName,klass/
const dataApi = /api\/\d{2}\/dataValueSets/

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

const sierraId = 'ImspTQPwCqd'
Given('the Sierra Leone org unit has been selected', () => {
    cy.get(`[data-test="input-org-unit-tree-tree-/${sierraId}"] label`).click()
    cy.get('@defaultData').then(defaultData => {
        cy.wrap({ ...defaultData, orgUnit: sierraId }).as('defaultData')
    })
})

Given('the first data set has been selected', () => {
    cy.fixture('dataSets').then(({ dataSets }) => {
        const [{ id }] = dataSets
        cy.selectCheckbox('dataSetPicker', id)

        cy.get('@defaultData').then(defaultData => {
            cy.wrap({ ...defaultData, dataSet: id }).as('defaultData')
        })
    })
})

Given('the user expands the root level of the org unit tree', () => {
    cy.get(`[data-test="input-org-unit-tree-tree-/${sierraId}-arrow"]`).click()
})

const boId = 'O6uvpzGd5pu'
When('the user selects the "Bo" org unit', () => {
    cy.get(
        `[data-test="input-org-unit-tree-tree-/${sierraId}/${boId}"] label`
    ).click()

    cy.get('@defaultData').then(defaultData => {
        const orgUnit = `${defaultData.orgUnit},${boId}`
        cy.wrap({ ...defaultData, orgUnit }).as('defaultData')
    })
})

Given('all data sets have been selected', () => {
    cy.selectAllDataSets()
    cy.get('@defaultData').then(defaultData => {
        cy.fixture('dataSets').then(({ dataSets }) => {
            const dataSet = dataSets.map(({ id }) => id).join(',')
            cy.wrap({ ...defaultData, dataSet }).as('defaultData')
        })
    })
})

Then('the download request is sent with the right parameters', () => {
    cy.wait('@downloadXHR').then(xhr => {
        cy.getComparisonData(xhr.url).then(
            ({ actual, expected: allExpected }) => {
                const { compression, ...expected } = allExpected
                expect(actual).to.deep.equal(expected)
            }
        )
    })
})
