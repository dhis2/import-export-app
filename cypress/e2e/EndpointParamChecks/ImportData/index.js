import '../common/settingFormValues'
import { Before, Given, Then } from '@badeball/cypress-cucumber-preprocessor'

// DataImport's onImport (see src/pages/DataImport/form-helper.js) posts to
// the plain `dataValueSets` endpoint with no file-extension suffix - `format`
// only sets the request's Content-Type header (see src/utils/xhr.js), it's
// never part of the URL.
//
// The upload response and the task/summary polling that follows it now all
// come from the real server via enableNetworkShim() (see
// cypress/support/e2e.js) - it records every request in
// `networkMode=capture` and replays the recorded responses in
// `networkMode=stub`. `dataApi` is kept as a pass-through cy.intercept()
// observer only because the Then block below explicitly cy.wait()s on it -
// enableNetworkShim() answers the actual request/response, this just gives
// the test something to alias and cy.wait() on.
const dataApi = /api\/dataValueSets/

Before(() => {
    cy.intercept('POST', dataApi).as('uploadXHR')
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
