import '../common/settingFormValues'
import { Before, Given, Then } from '@badeball/cypress-cucumber-preprocessor'

// The upload response now comes from the real server via
// enableNetworkShim() (see cypress/support/e2e.js) - it records the request
// in `networkMode=capture` and replays the recorded response in
// `networkMode=stub`. `dataApi` is kept as a pass-through cy.intercept()
// observer only because the Then block below explicitly cy.wait()s on it -
// enableNetworkShim() answers the actual request/response, this just gives
// the test something to alias and cy.wait() on.
const dataApi = /api\/metadata\/gml/

Before(() => {
    cy.intercept('POST', dataApi).as('uploadXHR')
})

Given('the user is on the gml page', () => {
    // There's no separate "GML import" sidebar link - GML shares the
    // "Org unit geometry import" page with GeoJSON (see
    // src/components/Sidebar/Sidebar.jsx and src/components/Router/Router.jsx)
    // and is reached by switching the format toggle on that page (see
    // src/components/Geometry/GeometryFormat.jsx).
    cy.visitPage('import', 'Org unit geometry')
    cy.contains('.segmented-control button', 'GML').click()
})

Then('the upload request is sent with the right parameters', () => {
    cy.wait('@uploadXHR').then((interception) => {
        cy.getComparisonData(interception.request.url).then(
            ({ actual, expected }) => {
                // `format` isn't a query param for GML uploads - the app
                // always posts to the hardcoded `metadata/gml.json`
                // endpoint (see src/pages/GeometryImport/gml-helper.js)
                // and there's no format field in the UI at all. `async`
                // is always sent, hardcoded to true, and isn't tied to
                // any UI input either.
                expect(actual).to.deep.equal({
                    ...expected,
                    async: 'true',
                })
            }
        )
    })
})
