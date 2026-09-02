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
// The actual download request built by onExport (see
// src/pages/EventExport/form-helper.js's `${apiBaseUrl}${endpoint}.${endpointExtension}?...`,
// where endpoint is the literal "events") - matches e.g.
// /api/tracker/events.json.zip?... Unlike the plain locationAssign(url)
// pages (ExportData/ExportTEI/ExportMetaData/...), this page's onExport
// actually awaits a real `fetch(url)` for the download *before* calling
// locationAssign, so this can be intercepted and forced to fail to test
// the error-alert path.
const eventsApi = /\/api\/tracker\/events\.[^?]+\?/

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
    // Unlike the other export pages (ExportData/ExportTEI/ExportMetaData/...),
    // which call locationAssign(url) synchronously from a plain onSubmit,
    // EventExport's onExport is async and does `await fetch(url)` and
    // `await response.blob()` *before* calling locationAssign (see
    // src/pages/EventExport/form-helper.js) - clicking submit resolves as
    // soon as the click event is dispatched, not once that async chain has
    // actually finished. A bare synchronous `expect(...).to.be.calledOnce`
    // right after the click can therefore run before locationAssign has
    // been called yet, so this needs a retrying `cy.should()` instead to
    // actually wait for it - not just any resolved `cy.get('@alias').then()`.
    cy.get('@locationAssign').should('have.been.calledOnce')

    cy.window().then((win) => {
        cy.get('@locationAssign').then((locationAssignStub) => {
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

Given('the event export request will fail', () => {
    cy.intercept(eventsApi, {
        statusCode: 409,
        body: {
            httpStatus: 'Conflict',
            httpStatusCode: 409,
            status: 'ERROR',
            message: 'Could not find an id for CODE on Data Element.',
        },
    }).as('downloadXHR')
})

Then('a warning alert is shown with the error message', () => {
    cy.wait('@downloadXHR')

    // src/components/Inputs/FormAlerts.jsx sets DATATEST to
    // "input-form-alerts" and passes it down as the `dataTest` prop -
    // src/components/FormAlerts/FormAlerts.jsx now forwards that correctly
    // to @dhis2-ui's AlertStack as `dataTest={dataTest}` (previously a
    // kebab-case `data-test={dataTest}` typo there meant AlertStack always
    // fell back to its own default "dhis2-uicore-alertstack" instead -
    // fixed directly in src/).
    cy.get('[data-test="input-form-alerts"]').should(
        'contain',
        'Could not find an id for CODE on Data Element.'
    )

    // onExport only calls locationAssign(url, blob) after a successful
    // fetch (see form-helper.js's `if (!response.ok) { ...return
    // exportErrorAlert(message) }`) - on a failed request it should bail
    // out with the alert above instead of still triggering a download.
    cy.get('@locationAssign').should('not.have.been.called')
})
