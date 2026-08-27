import '../common/settingFormValues'
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

// Data set / program data now comes from the real server via
// enableNetworkShim() (see cypress/support/e2e.js) - it records every
// request in `networkMode=capture` and replays the recorded responses in
// `networkMode=stub`, so this spec no longer needs its own
// cy.stubWithFixture()s for them. The download endpoint (.../metadata)
// never actually gets hit either way, live or stubbed - "the export form
// is submitted" below fully replaces window.locationAssign before
// clicking submit, so the browser never issues that request at all.
//
// dataSetsApi is still explicitly waited on below (the page's own "on this
// page" step waits for it to resolve before proceeding), so it's kept as a
// pass-through cy.intercept() observer - enableNetworkShim() answers the
// actual request/response, this just gives the test something to alias and
// cy.wait() on.
const dataSetsApi = /\/dataSets\?/
// Switching "objectType" to "Programs" (see the "different object type"
// scenario) makes the app refetch the objectList options from /programs
// instead of /dataSets. Nothing waited on that refetch before, which was
// invisible in live/stub mode (fast enough not to matter) but flaked in
// `networkMode=capture` - captureRequests.js's async per-request
// bookkeeping (buffering + scrubbing the response body, scanning
// existing stubs for duplicates before releasing the reply) adds just
// enough latency to occasionally lose the race against selecting
// "Antenatal care visit" from a still-populating dropdown. Registered as
// a pass-through observer from page load, same as dataSetsApi, so the
// "different object type" scenario has an alias to wait on.
const programsApi = /\/programs\?/

Given('the user is on the meta data dependency export page', () => {
    cy.intercept(dataSetsApi).as('dataSetsXHR')
    cy.intercept(programsApi).as('programsXHR')

    cy.visitPage('export', 'Metadata dependency')
    cy.wait('@dataSetsXHR')
})

Given('the programs list has loaded', () => {
    cy.wait('@programsXHR')
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
            const [objectType, objectList, format, _, compression] = url
                .match(
                    /api\/([^\/]+)\/([^\/]+)\/metadata\.([^.]+)(\.([^.]+))?\?/
                )
                .slice(1)

            cy.getComparisonData(url).then(({ actual, expected }) => {
                // objectType/objectList come straight off the URL's own
                // path segments (.../api/<objectType>/<objectId>/metadata...
                // - see src/pages/MetadataDependencyExport/form-helper.js's
                // `endpoint`), not off the query string, so they need their
                // own assertions here - the query-string comparison below
                // never sees them. Without this, a bug that downloaded the
                // wrong object type/id (e.g. still pointing at the
                // previously-selected data set after switching to
                // Programs) would go uncaught.
                expect(objectType).to.equal(expected.objectType)
                expect(objectList).to.equal(expected.objectList)
                expect(expected.format).to.equal(format)
                expect(expected.compression).to.equal(compression || '')

                const updatedExpected = {
                    download: 'true',
                    skipSharing: expected.skipSharing,
                }

                expect(actual).to.deep.equal(updatedExpected)
            })
        })
    })
})
