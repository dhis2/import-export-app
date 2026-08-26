import '../common/settingFormValues'
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

// Program, tracked entity type, user, and org unit (tree) data all now come
// from the real server via enableNetworkShim() (see cypress/support/e2e.js)
// - it records every request in `networkMode=capture` and replays the
// recorded responses in `networkMode=stub`, so this spec no longer needs
// its own cy.stubWithFixture()s for them. The download endpoint
// (trackedEntities) never actually gets hit either way, live or stubbed -
// "the export form is submitted" below fully replaces window.locationAssign
// before clicking submit, so the browser never issues that request at all.

Given('the user is on the tracked entity instances export page', () => {
    cy.visitPage('export', 'Tracked entity')
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
                            ? 'SELECTED'
                            : rest.orgUnitMode,
                }

                const expectedEntries = Object.entries(expected)

                for (const [name, value] of expectedEntries) {
                    expect(actual[name]).to.deep.equal(value)
                }
            }
        )
    })
})
