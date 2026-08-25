import '../common/settingFormValues'
import {
    Before,
    Given,
    Then,
    When,
} from '@badeball/cypress-cucumber-preprocessor'

const dataSetsApi = /\/dataSets\?fields=id,displayName&paging=false/
const orgUnitsFirstLevelApi =
    /\/organisationUnits\/ImspTQPwCqd\?fields=children\[id,displayName,path,children::isNotEmpty\]&paging=false/
const orgUnitsRootApi =
    /\/organisationUnits\?filter=level:eq:1&fields=id,path,displayName,children::isNotEmpty&paging=false/
const schemasApi =
    /\/schemas.json\?fields=metadata,collectionName,displayName,klass/
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
