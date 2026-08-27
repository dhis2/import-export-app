import '../common/settingFormValues'
import { Before, Given, Then } from '@badeball/cypress-cucumber-preprocessor'

// TEIImport's onImport (see src/pages/TEIImport/form-helper.js) posts to
// `${baseUrl}/api/tracker/?...` - there is no `trackedEntityInstances.json`
// segment (that's the pre-tracker API). Anchor to the literal `tracker/`
// segment, requiring `?` or end-of-string right after it so this doesn't
// also match the TEI/Event export endpoints
// (.../api/tracker/trackedEntities.json?...).
//
// The upload response and the tracker/jobs polling that follows it now all
// come from the real server via enableNetworkShim() (see
// cypress/support/e2e.js) - it records every request in
// `networkMode=capture` and replays the recorded responses in
// `networkMode=stub`. `teiApi` is kept as a pass-through cy.intercept()
// observer only because the Then block below explicitly cy.wait()s on it -
// enableNetworkShim() answers the actual request/response, this just gives
// the test something to alias and cy.wait() on.
const teiApi = /api\/tracker\/(\?|$)/

Before(() => {
    cy.intercept('POST', teiApi).as('uploadXHR')
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
                console.log('actual', actual)
                console.log('expected', expected)

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
