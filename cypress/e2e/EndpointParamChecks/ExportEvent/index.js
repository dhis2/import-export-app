import '../common/settingFormValues'
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

// Org unit tree data now comes from the real server via enableNetworkShim()
// (see cypress/support/e2e.js) - it records every request in
// `networkMode=capture` and replays the recorded responses in
// `networkMode=stub`, so this spec no longer needs its own
// cy.stubWithFixture()s for it.
//
// programsApi/programStagesApi are still explicitly waited on below (the
// page's own "on this page" step waits for both to resolve before
// proceeding), so they're kept as pass-through cy.intercept() observers -
// enableNetworkShim() answers the actual request/response, this just gives
// the test something to alias and cy.wait() on.
const programsApi = /\/programs\?/
const programStagesApi = /\/programs\/[a-zA-Z0-9]+/

Given('the user is on the event export page', () => {
    cy.intercept(programsApi).as('programsXHR')
    cy.intercept(programStagesApi).as('programStagesXHR')

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

Given('the program stages have finished loading', () => {
    cy.wait('@programStagesXHR')
})

Given('the program stage selection is cleared', () => {
    cy.getAliases('@defaultData', '@changedData').then(([, changedData]) => {
        cy.wrap({ ...changedData, programStages: '' }).as('changedData')
    })
})

Then('the program stage input is hidden', () => {
    cy.get('[data-test="input-program-stage-select"]').should('not.exist')
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
