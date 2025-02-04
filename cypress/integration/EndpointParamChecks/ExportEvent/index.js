import '../common/settingFormValues'
import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps'

const orgUnitsFirstLevelApi =
    /\/organisationUnits\/ImspTQPwCqd\?fields=children\[id,displayName,path,children::isNotEmpty\]&paging=false/
const orgUnitsRootApi =
    /\/organisationUnits\?filter=level:eq:1&fields=id,path,displayName,children::isNotEmpty&paging=false/
const programsApi = /\/programs\?/
const programStagesApi = /\/programs\/[a-zA-Z0-9]+/

Before(() => {
    cy.server()

    cy.stubWithFixture({
        url: orgUnitsRootApi,
        fixture: 'orgUnitsRoot',
    }).as('orgUnitsRootXHR')

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
                    const format = allExpected.format.replace('.', '')
                    const {
                        inclusion,
                        programStages,
                        compression,
                        ...expected
                    } = allExpected
                    const extension = compression ? `.${compression}` : ''

                    /**
                     * The Event page has some (WTF) customizations.
                     * These are handled here:
                     */
                    const updatedExpected = {
                        ...expected,
                        links: 'false',
                        skipPaging: 'true',
                        orgUnitMode: inclusion.toUpperCase(),
                        programStage: programStages,
                        format,
                    }

                    if (!updatedExpected.programStage) {
                        delete updatedExpected.programStage
                    }

                    console.log('actual', actual)
                    console.log('updatedExpected', updatedExpected)
                    expect(actual).to.deep.equal(updatedExpected)
                }
            )
        })
    })
})
