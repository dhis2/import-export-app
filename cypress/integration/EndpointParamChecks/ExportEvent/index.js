import '../common/settingFormValues'
import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps'

const orgUnitsFirstLevelApi = /api\/\d{2}\/organisationUnits\/ImspTQPwCqd\?fields=children\[id,displayName,path,children::isNotEmpty\]&paging=false/
const orgUnitsRootApi = /api\/\d{2}\/organisationUnits\?filter=level:eq:1&fields=id,path,displayName,children::isNotEmpty&paging=false/
const programsApi = /api\/\d{2}\/programs\?/
const programStagesApi = /api\/\d{2}\/programs\/[a-zA-Z0-9]+/

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
    cy.visitPage('export', 'event')
    cy.wait('@programsXHR')
    cy.wait('@programStagesXHR')
})

const sierraId = 'ImspTQPwCqd'
Given('the Sierra Leone org unit has been selected', () => {
    cy.get(`[data-test="input-org-unit-tree-tree-/${sierraId}"] label`).click()
    cy.get('@defaultData').then(defaultData => {
        cy.wrap({ ...defaultData, orgUnit: sierraId }).as('defaultData')
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
        const orgUnit = `${boId}`
        cy.wrap({ ...defaultData, orgUnit }).as('defaultData')
    })
})

When('the export form is submitted', () => {
    cy.window().then(win => {
        const locationAssignStub = cy.stub().as('locationAssign')
        win.locationAssign = locationAssignStub
        cy.get('[data-test="input-export-submit"]').click()
    })
})

Then('the download request is sent with the right parameters', () => {
    cy.window().then(win => {
        cy.get('@locationAssign').then(locationAssignStub => {
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
                    const attachment = `events.${format}${extension}`

                    /**
                     * The Event page has some (WTF) customizations.
                     * These are handled here:
                     */
                    const updatedExpected = {
                        ...expected,
                        links: 'false',
                        skipPaging: 'true',
                        ouMode: inclusion.toUpperCase(),
                        programStage: programStages,
                        attachment,
                        format,
                    }

                    if (!updatedExpected.programStage) {
                        delete updatedExpected.programStage
                    }

                    expect(actual).to.deep.equal(updatedExpected)
                }
            )
        })
    })
})
