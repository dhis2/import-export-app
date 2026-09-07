import '../common/settingFormValues'
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

// Data set, org unit, and org unit tree data all now come from the real
// server via enableNetworkShim() (see cypress/support/e2e.js) - it records
// every request in `networkMode=capture` and replays the recorded
// responses in `networkMode=stub`, so this spec no longer needs its own
// cy.stubWithFixture()s for them.
//
// The download endpoint (dataValueSets) previously never actually got hit,
// live or stubbed - "the export form is submitted" below replaces
// window.locationAssign before clicking submit, so no navigation was ever
// triggered. Since commit 9661c61877496d991a29e5403cc331b4429bf73d
// ("feat: fetch download or error alert function") and
// 0a1d6de5615d8cdac1185b2befc98a1ee4e7e87e ("feat: add form error alert
// export pages"), onExport now awaits a real fetch(url) for the download
// (via fetchAndDownload, see src/utils/helper.js) and only calls
// locationAssign(url, blob) once that succeeds - so this request is
// actually sent, and can be intercepted below to force it to fail.
const dataValueSetsApi = /\/api\/dataValueSets\.[^?]+\?/

Given('the user is on the data export page', () => {
    cy.visitPage('export', 'Data')
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

Given('the first data set has been selected', () => {
    // Picks whichever data set the real server lists first, rather than
    // assuming the id/displayName of a locally fixtured "first" data set -
    // the network response driving this list is no longer a local fixture
    // (see the note above), so the label to click is read from the DOM
    // instead of being known ahead of time.
    //
    // The label is read out in its own step and then re-queried by that
    // label text (mirroring the pre-migration version, which always
    // dblclicked a label-matched selector) rather than re-using the
    // originally queried element handle - the options list can re-render
    // as the remaining page-load network responses (e.g. the id-scheme
    // attribute lists) resolve, and dblclick-ing a handle that's gone
    // stale from under it is silently a no-op rather than an error.
    // Scoped to the source ("available") side specifically
    // (input-data-set-picker-list-sourceoptions, see the note below) -
    // the unscoped picker container holds both the source and picked
    // lists, so a plain .first() there would grab a picked option
    // instead once anything's already been selected.
    cy.get(
        `[data-test="input-data-set-picker-list-sourceoptions"] [data-test="dhis2-uicore-transferoption"]`
    )
        .first()
        .invoke('text')
        .then((label) => {
            cy.get(
                `[data-test="input-data-set-picker-list-sourceoptions"] [data-test="dhis2-uicore-transferoption"]:contains("${label}")`
            ).dblclick()
        })

    // ResourcePicker.jsx passes the underlying @dhis2-ui/transfer
    // component `dataTest={`${dataTest}-list`}` (see
    // src/components/ResourcePicker/ResourcePicker.jsx and how
    // selectAllDataSets.js already targets
    // "input-data-set-picker-list-actions-addall") - the "-pickedoptions"
    // container this reads from is therefore
    // "input-data-set-picker-list-pickedoptions", not
    // "input-data-set-picker-pickedoptions". Passing the plain
    // "input-data-set-picker" prefix here always missed it.
    cy.getValuesOfTransfer('input-data-set-picker-list').then(([id]) => {
        cy.get('@defaultData').then((defaultData) => {
            cy.wrap({ ...defaultData, dataSet: id }).as('defaultData')
        })
    })
})

When('the user expands the root level of the org unit tree', () => {
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

Given('all data sets have been selected', () => {
    cy.selectAllDataSets()

    // See the note in "the first data set has been selected" above -
    // the picked-options container's real data-test is
    // "input-data-set-picker-list-pickedoptions".
    cy.getValuesOfTransfer('input-data-set-picker-list').then((ids) => {
        cy.get('@defaultData').then((defaultData) => {
            cy.wrap({ ...defaultData, dataSet: ids.join(',') }).as(
                'defaultData'
            )
        })
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

        // `format` isn't a query param - it's the download URL's file
        // extension (.../dataValueSets.<format>?...) - so it's checked
        // separately rather than via the parsed query string below.
        const [pathPart] = requestUrl.split('?')

        cy.getComparisonData(requestUrl).then(
            ({ actual, expected: allExpected }) => {
                const { compression, format, ...expected } = allExpected
                console.log('actual', actual)
                console.log('expected', expected)

                expect(pathPart).to.match(new RegExp(String.raw`\.${format}$`))

                const expectedEntries = Object.entries(expected)
                for (const [name, value] of expectedEntries) {
                    expect(actual[name]).to.deep.equal(value)
                }
            }
        )
    })
})

Given('the data export request will fail', () => {
    cy.intercept(dataValueSetsApi, {
        statusCode: 409,
        body: {
            httpStatus: 'Conflict',
            httpStatusCode: 409,
            status: 'ERROR',
            message: 'Could not find an id for CODE on Data Element.',
        },
    }).as('downloadXHR')
})

Then('a warning alert is shown with the error message', () => {
    cy.wait('@downloadXHR')

    // src/components/Inputs/FormAlerts.jsx sets DATATEST to
    // "input-form-alerts" and passes it down as the `dataTest` prop to
    // src/components/FormAlerts/FormAlerts.jsx, which forwards it to
    // @dhis2-ui's AlertStack as `dataTest={dataTest}`.
    cy.get('[data-test="input-form-alerts"]').should(
        'contain',
        'Could not find an id for CODE on Data Element.'
    )

    // fetchAndDownload (src/utils/helper.js) only calls
    // locationAssign(url, blob) after a successful fetch - on a failed
    // request it should bail out with the alert above instead of still
    // triggering a download.
    cy.get('@locationAssignStub').should('not.have.been.called')
})
