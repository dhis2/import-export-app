import '../common/settingFormValues'
import { Before, Given, Then } from '@badeball/cypress-cucumber-preprocessor'

// TEIImport's onImport (see src/pages/TEIImport/form-helper.js) posts to
// `${baseUrl}/api/tracker/?...` - there is no `trackedEntityInstances.json`
// segment (that's the pre-tracker API), so the old regex never matched the
// real upload request. Anchor to the literal `tracker/` segment, requiring
// `?` or end-of-string right after it so this doesn't also match the
// TEI/Event export endpoints (.../api/tracker/trackedEntities.json?...).
const teiApi = /api\/tracker\/(\?|$)/
// TEIImport always calls uploadFile with type: 'TRACKER_IMPORT_JOB' (see
// form-helper.js), and useTasks.js's createFetchEvents/createFetchSummary
// branch on `task.importType === 'TRACKER_IMPORT_JOB'` to poll the tracker
// job facade (`tracker/jobs/`) instead of the generic `system/tasks/` /
// `system/taskSummaries/` queries (see ImportEvent/index.js, which shares
// this exact code path) - the generic ones are never reached for TEI
// import, so stubbing them leaves the real tracker/jobs/ polling request
// unstubbed (and unhandled network errors from that fail the test). Anchor
// the events pattern right after the job id (`?` or end-of-string) so it
// doesn't also match the report sub-resource matched by summaryApi below.
const tasksApi = /api\/tracker\/jobs\/[a-zA-Z0-9]+(\?|$)/
const summaryApi = /api\/tracker\/jobs\/[a-zA-Z0-9]+\/report/

Before(() => {
    cy.stubWithFixture({
        method: 'POST',
        url: teiApi,
        fixture: 'teiImportUpload',
    }).as('uploadXHR')

    cy.stubWithFixture({
        url: tasksApi,
        fixture: 'teiImportTasks',
    }).as('tasksXHR')

    cy.stubWithFixture({
        url: summaryApi,
        fixture: 'teiImportSummaries',
    }).as('summaryXHR')
})

Given('the user is on the tracked entity instances import page', () => {
    // The sidebar menu entry for this page (see
    // src/components/Sidebar/Sidebar.jsx) is labeled "Tracked entity
    // import", not "TEI import" - cy.visitPage builds the link selector as
    // `${name} ${type}`.
    cy.visitPage('import', 'Tracked entity')
})

Then('the upload request is sent with the right parameters', () => {
    cy.wait('@uploadXHR').then((interception) => {
        cy.getComparisonData(interception.request.url).then(
            ({ actual, expected: allExpected }) => {
                // `format` is never sent as a query param - onImport only
                // uses it to set the upload request's Content-Type header
                // (see src/pages/TEIImport/form-helper.js and
                // src/utils/xhr.js).
                const { format, ...expected } = allExpected

                expect(actual).to.deep.equal({
                    ...expected,
                    // isAsync is hardcoded to true in TEIImport.jsx's
                    // initialValues - there's no UI toggle for it (no
                    // <IsAsync /> rendered), so it's always sent as 'true'.
                    async: 'true',
                })
            }
        )
    })
})
