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
    }).as('tasksXHR')
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
