import '../common/settingFormValues'
import { Before, Given, Then } from '@badeball/cypress-cucumber-preprocessor'

// DataImport's onImport (see src/pages/DataImport/form-helper.js) posts to
// the plain `dataValueSets` endpoint with no file-extension suffix - `format`
// only sets the request's Content-Type header (see src/utils/xhr.js), it's
// never part of the URL - so the old regex requiring json/xml/csv/adx/pdf
// right after the endpoint name never matched the real upload request.
const dataApi = /api\/dataValueSets/
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
        fixture: 'dataImportUpload',
    }).as('uploadXHR')

    cy.stubWithFixture({
        url: tasksApi,
        fixture: 'dataImportTasks',
    }).as('tasksXHR')

    cy.stubWithFixture({
        url: summaryApi,
        fixture: 'dataImportSummaries',
    }).as('tasksXHR')
})

Given('the user is on the data import page', () => {
    cy.visitPage('import', 'Data')
})

Then('the upload request is sent with the right parameters', () => {
    cy.wait('@uploadXHR').then((interception) => {
        cy.getComparisonData(interception.request.url).then(
            ({ actual, expected: allExpected }) => {
                // `format` isn't a query param for this endpoint - it only
                // sets the upload request's Content-Type header (see
                // src/pages/DataImport/form-helper.js and src/utils/xhr.js's
                // getMimeType), so it's excluded from the parsed-query-string
                // comparison below.
                const { format, ...expected } = allExpected

                expect(actual).to.deep.equal({
                    ...expected,
                    async: 'true',
                })
            }
        )
    })
})
