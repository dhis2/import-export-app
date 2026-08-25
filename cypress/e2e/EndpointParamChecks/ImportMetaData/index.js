import '../common/settingFormValues'
import { Before, Given, Then } from '@badeball/cypress-cucumber-preprocessor'

// The upload URL is `${baseUrl}/api/metadata?<params>` (see
// src/pages/MetadataImport/form-helper.js) - `format` only controls the
// upload's Content-Type header (src/utils/xhr.js), it's never appended as a
// `.json`/etc extension or query param. The previous `/api\/metadata.json/`
// pattern (besides the unescaped `.` matching any character) required a
// literal "json" substring somewhere after "metadata", which never appears
// in the real request URL, so it never matched and `cy.wait('@uploadXHR')`
// would hang.
const metadataApi = /\/api\/metadata(\?|$)/
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
        url: metadataApi,
        fixture: 'metadataImportUpload',
    }).as('uploadXHR')

    cy.stubWithFixture({
        url: tasksApi,
        fixture: 'metadataImportTasks',
    }).as('tasksXHR')

    cy.stubWithFixture({
        url: summaryApi,
        fixture: 'metadataImportSummaries',
    }).as('tasksXHR')
})

Given('the user is on the meta data import page', () => {
    cy.visitPage('import', 'Metadata')
})

Then('the upload request is sent with the right parameters', () => {
    cy.wait('@uploadXHR').then((interception) => {
        cy.getComparisonData(interception.request.url).then(
            ({ actual, expected: allExpected }) => {
                // `format` is only used to set the upload's Content-Type
                // header (see uploadFile()/getUploadXHR() in
                // src/utils/xhr.js and src/pages/MetadataImport/form-helper.js)
                // - it's never sent as a query param, so it must be
                // excluded from the comparison.
                const { format, ...expected } = allExpected

                expect(actual).to.deep.equal(expected)
            }
        )
    })
})
