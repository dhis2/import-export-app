import '../common/settingFormValues'
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

// Schema data now comes from the real server via enableNetworkShim() (see
// cypress/support/e2e.js) - it records every request in
// `networkMode=capture` and replays the recorded responses in
// `networkMode=stub`, so this spec no longer needs its own
// cy.stubWithFixture() for it. The download endpoint (metadata.<format>)
// never actually gets hit either way, live or stubbed - "the export form
// is submitted" below fully replaces window.locationAssign before
// clicking submit, so the browser never issues that request at all.

Given('the user is on the meta data export page', () => {
    cy.visitPage('export', 'Metadata')
})

Given('all schemas have been selected', () => {
    cy.get(`[data-test="input-schemas-select-all"]`).click()

    cy.get('@changedData').then((changedData) => {
        cy.get('[name^="schemas."]').then(($inputs) => {
            const updates = $inputs.toArray().reduce((curUpdates, input) => {
                const $input = Cypress.$(input)
                const name = $input.attr('name')
                const actualName = name.replace('schemas.', '')
                return {
                    ...curUpdates,
                    [actualName]: 'true',
                }
            }, changedData)

            cy.wrap(updates).as('changedData')
        })
    })
})

Given('the schemas are all deselected', () => {
    cy.get(`[data-test="input-schemas-select-none"]`).click()

    cy.get('@changedData').then((changedData) => {
        cy.get('[name^="schemas."]').then(($inputs) => {
            const updates = $inputs.toArray().reduce(
                (curUpdates, input) => {
                    const $input = Cypress.$(input)
                    const name = $input.attr('name')
                    const actualName = name.replace('schemas.', '')

                    delete curUpdates[actualName]
                    return curUpdates
                },
                { ...changedData }
            )

            cy.wrap(updates).as('changedData')
        })
    })
})

Given('the category option schema is selected', () => {
    cy.toggleCheckbox('schemas.categoryOptions')
    cy.get('@changedData').then((changedData) => {
        cy.wrap({ ...changedData, categoryOptions: 'true' }).as('changedData')
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

Then('the download request is not sent', () => {
    cy.get('@locationAssignStub').should('not.have.been.called')
})

Then('the download request is sent with the right parameters', () => {
    cy.get('@locationAssignStub').should('have.been.calledOnce')

    cy.window().then((win) => {
        const requestUrl = win.locationAssign.getCall(0).args[0]

        cy.getComparisonData(requestUrl).then(
            ({ actual, expected: allExpected }) => {
                const { format, compression, ...expected } = allExpected
                console.log('actual', JSON.stringify(actual))
                console.log('expected', JSON.stringify(expected))
                expect(actual).to.deep.equal({
                    ...expected,
                    download: 'true',
                })
            }
        )
    })
})
