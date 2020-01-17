import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

const loginUrl = Cypress.env('LOGIN_URL')

Given('a unique attribute is associated with organisation units', () => {
    cy.server()
        .stubWithFixture({
            url: /attributes.json\?.*filter=organisationUnitAttribute:eq:true/,
            fixture: 'orgUnitAttributes',
        })
        .as('orgUnitAttributesXHR')
})

Given('the user is on the data import page', () => {
    cy.visitWhenStubbed(Cypress.env('APP_URL'))
        .get('[data-test="sidebar-link-import-data"]')
        .click()
})

Given('the user is on the data export page', () => {
    cy.visitWhenStubbed(Cypress.env('APP_URL'))
        .get('[data-test="sidebar-link-export-data"]')
        .click()
})

Then(
    'it should be a selectable option in the organisation unit id scheme input',
    () => {
        cy.wait(['@orgUnitAttributesXHR'])
            .then(async xhr => JSON.parse(await xhr.response.body.text()))
            .then(({ attributes }) => {
                cy.get('[data-test="more-options-button"]').click()
                cy.get('[data-test="input-org-unit-id-scheme"]').then(
                    $orgUnitIdScheme => {
                        $orgUnitIdScheme.find('button').click()
                        cy.get('[role="presentation"] [role="menuitem"]').then(
                            $menuItems => {
                                const allItemLabels = $menuItems
                                    .toArray()
                                    .map(el => el.innerText)
                                attributes.forEach(({ displayName }) => {
                                    expect(
                                        allItemLabels.findIndex(
                                            label => label === displayName
                                        )
                                    ).to.not.equal(-1)
                                })
                            }
                        )
                    }
                )
            })
    }
)
