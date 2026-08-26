import '../common/settingFormValues'
import { Before, Given, Then } from '@badeball/cypress-cucumber-preprocessor'

// EventImport's onImport (see src/pages/EventImport/form-helper.js) posts to
// `${baseUrl}/api/tracker?...` - there is no `events` segment and no
// file-extension suffix (`format` only sets the request's Content-Type
// header, see src/utils/xhr.js), so the old /api/events.(json|xml|csv)/
// regex never matched the real upload request. Anchor to the literal
// `tracker` endpoint, requiring `?` or end-of-string right after it so this
// doesn't also match other /api/tracker/... resources (e.g. the TEI/Event
// export endpoints).
const dataApi = /api\/tracker(\?|$)/
// EventImport always calls uploadFile with type: 'TRACKER_IMPORT_JOB' (see
// form-helper.js), and useTasks.js's createFetchEvents/createFetchSummary
// branch on `task.importType === 'TRACKER_IMPORT_JOB'` to poll the tracker
// job facade (`tracker/jobs/`) instead of the generic `system/tasks/` /
// `system/taskSummaries/` queries - the generic ones are never reached for
// Event import, so stubbing them leaves the real tracker/jobs/ polling
// request unstubbed (and unhandled network errors from that fail the
// test). Anchor the events pattern right after the job id (`?` or
// end-of-string) so it doesn't also match the report sub-resource matched
// by summaryApi below.
const tasksApi = /api\/tracker\/jobs\/[a-zA-Z0-9]+(\?|$)/
const summaryApi = /api\/tracker\/jobs\/[a-zA-Z0-9]+\/report/

Before(() => {
    cy.stubWithFixture({
        method: 'POST',
        url: dataApi,
        fixture: 'eventImportUpload',
    }).as('uploadXHR')

    cy.stubWithFixture({
        url: tasksApi,
        fixture: 'eventImportTasks',
    }).as('tasksXHR')

    cy.stubWithFixture({
        url: summaryApi,
        fixture: 'eventImportSummaries',
    }).as('summaryXHR')
})

Given('the user is on the event page', () => {
    cy.visitPage('import', 'Event')
})

Then('the upload request is sent with the right parameters', () => {
    cy.wait('@uploadXHR').then((interception) => {
        cy.getComparisonData(interception.request.url).then(
            ({ actual, expected: allExpected }) => {
                // `format` is never sent as a query param - onImport only
                // uses it to set the request's Content-Type header. `dryRun`
                // isn't sent verbatim either - it's translated into the
                // `importMode` param (see src/pages/EventImport/form-helper.js).
                const { format, dryRun, ...expected } = allExpected

                expect(actual).to.deep.equal({
                    ...expected,
                    async: 'true',
                    importMode: dryRun === 'true' ? 'validate' : 'commit',
                })
            }
        )
    })
})
