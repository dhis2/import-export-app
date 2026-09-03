import '../common/settingFormValues'
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

// Schema data now comes from the real server via enableNetworkShim() (see
// cypress/support/e2e.js) - it records every request in
// `networkMode=capture` and replays the recorded responses in
// `networkMode=stub`, so this spec no longer needs its own
// cy.stubWithFixture() for it.
//
// The download endpoint (metadata.<format>) previously never actually got
// hit, live or stubbed - "the export form is submitted" below replaces
// window.locationAssign before clicking submit, so no navigation was ever
// triggered. Since commit 9661c61877496d991a29e5403cc331b4429bf73d
// ("feat: fetch download or error alert function") and
// 0a1d6de5615d8cdac1185b2befc98a1ee4e7e87e ("feat: add form error alert
// export pages"), onExport now awaits a real fetch(url) for the download
// (via fetchAndDownload, see src/utils/helper.js) and only calls
// locationAssign(url, blob) once that succeeds - so this request is
// actually sent, and can be intercepted below to force it to fail.
const metadataApi = /\/api\/metadata\.[^?]+\?/

Given('the user is on the meta data export page', () => {
    cy.visitPage('export', 'Metadata')
})

Given('all schemas have been selected', () => {
    cy.get(`[data-test="input-schemas-select-all"]`).click()

    cy.get('@changedData').then((changedData) => {
        cy.get('[name^="schemas."]').then(($inputs) => {
            const updates = $inputs.toArray().reduce((curUpdates, input) => {
                const $input = Cypress.$(input)
                const name = $input.attr('name')
                const actualName = name.replace('schemas.', '')
                return {
                    ...curUpdates,
                    [actualName]: 'true',
                }
            }, changedData)

            cy.wrap(updates).as('changedData')
        })
    })
})

Given('the schemas are all deselected', () => {
    cy.get(`[data-test="input-schemas-select-none"]`).click()

    cy.get('@changedData').then((changedData) => {
        cy.get('[name^="schemas."]').then(($inputs) => {
            const updates = $inputs.toArray().reduce(
                (curUpdates, input) => {
                    const $input = Cypress.$(input)
                    const name = $input.attr('name')
                    const actualName = name.replace('schemas.', '')

                    delete curUpdates[actualName]
                    return curUpdates
                },
                { ...changedData }
            )

            cy.wrap(updates).as('changedData')
        })
    })
})

Given('the category option schema is selected', () => {
    cy.toggleCheckbox('schemas.categoryOptions')
    cy.get('@changedData').then((changedData) => {
        cy.wrap({ ...changedData, categoryOptions: 'true' }).as('changedData')
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

Then('the download request is not sent', () => {
    cy.get('@locationAssignStub').should('not.have.been.called')
})

Then('the download request is sent with the right parameters', () => {
    // onExport now awaits a real fetch(url) for the download (via
    // fetchAndDownload, see src/utils/helper.js) before calling
    // locationAssign - and with the Background's "all schemas have been
    // selected" step, this request asks the real server to generate and
    // zip a full metadata export (59 schemas), which can comfortably take
    // longer than the default 4000ms command timeout. The XHR log from a
    // timed-out run shows this request still pending (no status code
    // logged yet) rather than any error response, confirming this is a
    // slow response, not a bad request - so the fix is a longer retry
    // window here, not a code change.
    cy.get('@locationAssignStub', { timeout: 30000 }).should(
        'have.been.calledOnce'
    )

    cy.window().then((win) => {
        const requestUrl = win.locationAssign.getCall(0).args[0]

        cy.getComparisonData(requestUrl).then(
            ({ actual, expected: allExpected }) => {
                const { format, compression, ...expected } = allExpected
                console.log('actual', JSON.stringify(actual))
                console.log('expected', JSON.stringify(expected))
                expect(actual).to.deep.equal({
                    ...expected,
                    download: 'true',
                })
            }
        )
    })
})

Given('the meta data export request will fail', () => {
    cy.intercept(metadataApi, {
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

    cy.get('[data-test="input-form-alerts"]').should(
        'contain',
        'Could not find an id for CODE on Data Element.'
    )

    cy.get('@locationAssignStub').should('not.have.been.called')
})
