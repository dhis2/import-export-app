import '../common/settingFormValues'
import { Before, Given, Then } from '@badeball/cypress-cucumber-preprocessor'

// EventImport's onImport (see src/pages/EventImport/form-helper.js) posts to
// `${baseUrl}/api/tracker?...` - there is no `events` segment and no
// file-extension suffix (`format` only sets the request's Content-Type
// header, see src/utils/xhr.js). Anchor to the literal `tracker` endpoint,
// requiring `?` or end-of-string right after it so this doesn't also match
// other /api/tracker/... resources (e.g. the TEI/Event export endpoints).
//
// The upload response and the tracker/jobs polling that follows it now all
// come from the real server via enableNetworkShim() (see
// cypress/support/e2e.js) - it records every request in
// `networkMode=capture` and replays the recorded responses in
// `networkMode=stub`. `dataApi` is kept as a pass-through cy.intercept()
// observer only because the Then block below explicitly cy.wait()s on it -
// enableNetworkShim() answers the actual request/response, this just gives
// the test something to alias and cy.wait() on.
const dataApi = /api\/tracker(\?|$)/

Before(() => {
    cy.intercept('POST', dataApi).as('uploadXHR')
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
