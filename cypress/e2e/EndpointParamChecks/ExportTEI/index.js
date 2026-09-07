import '../common/settingFormValues'
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

// Program, tracked entity type, user, and org unit (tree) data all now come
// from the real server via enableNetworkShim() (see cypress/support/e2e.js)
// - it records every request in `networkMode=capture` and replays the
// recorded responses in `networkMode=stub`, so this spec no longer needs
// its own cy.stubWithFixture()s for them.
//
// The download endpoint (trackedEntities) previously never actually got
// hit, live or stubbed - "the export form is submitted" below replaces
// window.locationAssign before clicking submit, so no navigation was ever
// triggered. Since commit 9661c61877496d991a29e5403cc331b4429bf73d
// ("feat: fetch download or error alert function") and
// 0a1d6de5615d8cdac1185b2befc98a1ee4e7e87e ("feat: add form error alert
// export pages"), onExport now awaits a real fetch(url) for the download
// (via fetchAndDownload, see src/utils/helper.js) and only calls
// locationAssign(url, blob) once that succeeds - so this request is
// actually sent, and can be intercepted below to force it to fail.
const trackedEntitiesApi = /\/api\/tracker\/trackedEntities\.[^?]+\?/

// Registered as a pass-through observer from page load (same pattern as
// dataSetsApi/programsApi in ExportMetaDataDependency/index.js) so
// "the tracked entity types list has loaded" below has something to wait
// on - enableNetworkShim() answers the actual request/response, this just
// gives the test an alias to cy.wait() on.
const trackedEntityTypesApi = /\/trackedEntityTypes\?/

Given('the user is on the tracked entity instances export page', () => {
    cy.intercept(trackedEntityTypesApi).as('trackedEntityTypesXHR')
    cy.visitPage('export', 'Tracked entity')
})

// Setting "teiTypeFilter" to "TE" lazily triggers a GET to
// /api/44/trackedEntityTypes to populate the TETypePicker (see
// src/components/Inputs/TETypePicker.jsx / ResourcePicker.jsx). Nothing
// waited on that fetch before, which is fast enough not to matter in
// live/stub mode, but in `networkMode=capture` captureRequests.js's async
// per-request bookkeeping (buffering + scrubbing the response body,
// scanning existing stubs for duplicates before releasing the reply) adds
// just enough latency to occasionally lose the race against selecting
// "Person" from a still-populating dropdown (same class of flake as the
// "different object type" scenario note in
// ExportMetaDataDependency/index.js).
Given('the tracked entity types list has loaded', () => {
    cy.wait('@trackedEntityTypesXHR')
})

const sierraId = 'ImspTQPwCqd'
Given('the Sierra Leone org unit has been selected', () => {
    cy.get(
        `[data-test="input-org-unit-tree"] label:contains("Sierra Leone")`
    ).click()
    cy.get('@defaultData').then((defaultData) => {
        cy.wrap({ ...defaultData, orgUnit: sierraId }).as('defaultData')
    })
})

Given('the user expands the root level of the org unit tree', () => {
    cy.get('[data-test="input-org-unit-tree-node-toggle"]').first().click()
})

const boId = 'O6uvpzGd5pu'
When('the user selects the "Bo" org unit', () => {
    cy.get(`[data-test="input-org-unit-tree"] label:contains("Bo")`)
        .filter((index, el) => Cypress.$(el).text().match(/Bo$/))
        .click()

    cy.get('@defaultData').then((defaultData) => {
        const orgUnit = `${defaultData.orgUnit},${boId}`
        cy.wrap({ ...defaultData, orgUnit }).as('defaultData')
    })
})

When('the export form is submitted', () => {
    // The app checks for window.locationAssign as a test hook (see
    // src/utils/helper.js) and calls it with the download URL instead of
    // triggering a real navigation/download when it's stubbed. It doesn't
    // exist on window by default, so it must be defined before cy.stub can
    // wrap it.
    cy.window().then((win) => {
        win.locationAssign = () => {}
        cy.stub(win, 'locationAssign').as('locationAssignStub')
    })

    cy.get('[data-test="input-export-submit"]').click()
})

Then('the download request is sent with the right parameters', () => {
    cy.get('@locationAssignStub').should('have.been.calledOnce')

    cy.window().then((win) => {
        const requestUrl = win.locationAssign.getCall(0).args[0]

        // The TEI export always downloads from the tracker API's single
        // trackedEntities endpoint (see src/pages/TEIExport/form-helper.js's
        // onExport - `endpoint` is hardcoded to `trackedEntities`; only the
        // file extension varies, with `format`). Filtering by program or by
        // tracked entity type (teiTypeFilter) never changes which endpoint
        // gets hit - it only adds `program=<uid>` / `trackedEntityType=<uid>`
        // query params, which the query-string comparison below already
        // covers. So unlike e.g. ExportMetaDataDependency (where the object
        // type genuinely picks a different endpoint segment, such as
        // api/programs/<id>/metadata), there's no per-filter path to assert
        // here - but the path itself was never checked at all before, so a
        // regression that hit the wrong endpoint (e.g. a stale pre-tracker
        // API URL) would have gone uncaught.
        const pathMatch = requestUrl.match(
            /\/api\/tracker\/trackedEntities\.([^?]+)\?/
        )
        expect(
            pathMatch,
            `Expected the download URL to hit api/tracker/trackedEntities.<format>, but got: ${requestUrl}`
        ).to.not.be.null
        const [, urlFormat] = pathMatch

        cy.getComparisonData(requestUrl).then(
            ({ actual, expected: allExpected }) => {
                const {
                    // omit values that are not send to the endpoint
                    teiTypeFilter,
                    lastUpdatedFilter,
                    assignedUserModeFilter,

                    // values that might be sent only if they're not empty
                    programStatus,
                    assignedUser,

                    // only sent when not the default ('ALL')
                    followUp,

                    // values that need a different key
                    orgUnit,

                    // when orgUnitMode is ':MANUAL:', form-helper.js
                    // overwrites the `orgUnitMode` param with this field's
                    // value instead (see the "include selected org.units
                    // only when manual selection is selected" comment in
                    // src/pages/TEIExport/form-helper.js) - it's not sent
                    // as its own `inclusion` param, so it must be omitted
                    // from `rest` here and folded into `orgUnitMode` below
                    // instead. It isn't set in the Background's options
                    // table, so default to 'SELECTED' - the same default
                    // src/components/Inputs/Inclusion.jsx's radio group
                    // itself uses - when a scenario hasn't overridden it.
                    inclusion,
                    ...rest
                } = allExpected

                const expected = {
                    ...rest,
                    ...(rest.orgUnitMode === ':MANUAL:'
                        ? { orgUnits: orgUnit }
                        : {}),
                    ...(programStatus !== '' ? { programStatus } : {}),
                    ...(followUp !== 'ALL' ? { followUp } : {}),
                    ...(assignedUser
                        ? { assignedUsers: assignedUser.join(',') }
                        : {}),
                    orgUnitMode:
                        rest.orgUnitMode === ':MANUAL:'
                            ? inclusion || 'SELECTED'
                            : rest.orgUnitMode,
                }

                // The URL's file extension is expected to always match the
                // `format` field/query param (see onExport's
                // `${endpoint}.${format}?...` template above).
                expect(urlFormat).to.equal(expected.format)

                // `fields` is a hardcoded constant added to every request
                // (see valuesToParams's
                // `fields: '*,enrollments[*,events[*]]'` in
                // src/pages/TEIExport/form-helper.js - added by commit
                // e1580470c9ee6bd974445b09ff0795c3e74aaaed "fix: include
                // enrollments, events in tei export"). It isn't derived
                // from any form value, so it's never present in
                // defaultData/changedData and would otherwise go
                // completely unchecked by the loop below.
                expect(actual.fields).to.equal('*,enrollments[*,events[*]]')

                const expectedEntries = Object.entries(expected)

                for (const [name, value] of expectedEntries) {
                    expect(actual[name]).to.deep.equal(value)
                }
            }
        )
    })
})

Given('the tracked entity instances export request will fail', () => {
    cy.intercept(trackedEntitiesApi, {
        statusCode: 409,
        body: {
            httpStatus: 'Conflict',
            httpStatusCode: 409,
            status: 'ERROR',
            message: 'Could not find an id for CODE on Tracked Entity.',
        },
    }).as('downloadXHR')
})

Then('a warning alert is shown with the error message', () => {
    cy.wait('@downloadXHR')

    cy.get('[data-test="input-form-alerts"]').should(
        'contain',
        'Could not find an id for CODE on Tracked Entity.'
    )

    cy.get('@locationAssignStub').should('not.have.been.called')
})
