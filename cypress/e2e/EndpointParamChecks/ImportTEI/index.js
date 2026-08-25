import '../common/settingFormValues'
import { Before, Given, Then } from '@badeball/cypress-cucumber-preprocessor'

// TEIImport's onImport (see src/pages/TEIImport/form-helper.js) posts to
// `${baseUrl}/api/tracker/?...` - there is no `trackedEntityInstances.json`
// segment (that's the pre-tracker API), so the old regex never matched the
// real upload request. Anchor to the literal `tracker/` segment, requiring
// `?` or end-of-string right after it so this doesn't also match the
// TEI/Event export endpoints (.../api/tracker/trackedEntities.json?...).
const teiApi = /api\/tracker\/(\?|$)/
// Scoped to the real API resource path (see useTasks.js's `system/tasks/`
// and `system/taskSummaries/`) - unanchored /tasks/ and /taskSummaries/
// also match the app's own source module URLs (e.g. src/utils/tasks.jsx),
// which Cypress would then serve the fixture for instead of real JS,
// breaking the app's own dynamic import of D2App/App.jsx.
const tasksApi = /api\/system\/tasks\//
const summaryApi = /api\/system\/taskSummaries\//

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
    }).as('tasksXHR')
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
