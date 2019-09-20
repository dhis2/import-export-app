import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps'

const loginUrl = Cypress.env('LOGIN_URL')

Before(() => {
    cy.server()
        .stubWithFixture({
            url: `${loginUrl}/api/attributes.json?paging=false&fields=id,displayName&filter=unique:eq:true&filter=organisationUnitAttribute:eq:true`,
            fixture: 'orgUnitAttributes',
        })
        .as('orgUnitAttributesXHR')
})

Given('the user is on the data import page', () => {
    cy.visitWhenStubbed(Cypress.env('APP_URL'))
        .get('[data-test-id="sidebar-link-import-data"]')
        .click()
})

Given('the user is on the data export page', () => {
    cy.visitWhenStubbed(Cypress.env('APP_URL'))
        .get('[data-test-id="sidebar-link-export-data"]')
        .click()
})

Given('an attribute is associated with organisation units', () => {
    cy.wait(['@orgUnitAttributesXHR'])
        .then(async xhr => JSON.parse(await xhr.response.body.text()))
        .as('orgUnitAttributes')

    cy.get('@orgUnitAttributes').then(({ attributes }) => {
        expect(attributes).to.have.length.of.at.least(1)
    })
})

Then(
    'it should be a selectable option in the organisation unit id scheme input',
    () => {
        cy.get('@orgUnitAttributes').then(({ attributes }) => {
            cy.get('[data-test-id="more-options-button"]').click()
            cy.get('[data-test-id="input-org-unit-id-scheme"]').then(
                $orgUnitIdScheme => {
                    if (
                        $orgUnitIdScheme
                            .find('> div')
                            .attr('class')
                            .match(/styles_formControl/)
                    ) {
                        /**
                         * "Old school style"
                         * The export page hasn't been refactored yet
                         */
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
                    } else {
                        /**
                         * "New style"
                         * After refatoring, using `ui-core` components
                         */
                        attributes.forEach(({ id }) => {
                            expect(
                                $orgUnitIdScheme
                                    .find(`[value="ATTRIBUTE:${id}"]`)
                                    .toArray()
                            ).to.have.lengthOf(1)
                        })
                    }
                }
            )
        })
    }
)
