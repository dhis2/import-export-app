import '../common/settingFormValues'
import { Before, Given, Then } from '@badeball/cypress-cucumber-preprocessor'

// The upload URL is `${baseUrl}/api/metadata?<params>` (see
// src/pages/MetadataImport/form-helper.js) - `format` only controls the
// upload's Content-Type header (src/utils/xhr.js), it's never appended as a
// `.json`/etc extension or query param.
//
// The upload response and the task/summary polling that follows it now all
// come from the real server via enableNetworkShim() (see
// cypress/support/e2e.js) - it records every request in
// `networkMode=capture` and replays the recorded responses in
// `networkMode=stub`. `metadataApi` is kept as a pass-through
// cy.intercept() observer only because the Then block below explicitly
// cy.wait()s on it - enableNetworkShim() answers the actual
// request/response, this just gives the test something to alias and
// cy.wait() on.
const metadataApi = /\/api\/metadata(\?|$)/

Before(() => {
    cy.intercept('POST', metadataApi).as('uploadXHR')
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

                // `mergeMode` is no longer an editable field on this page -
                // it's always sent as "REPLACE" (see
                // src/components/MergeOperation/MergeOperation.jsx's
                // `mergeOperation` constant, used as the fixed value in
                // src/pages/MetadataImport/MetadataImport.jsx). There is no
                // UI control for it any more, so it's never set via the
                // feature file's tables and must be added here instead.
                expect(actual).to.deep.equal({
                    ...expected,
                    mergeMode: 'REPLACE',
                })
            }
        )
    })
})
