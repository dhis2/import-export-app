import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

const loginUrl = Cypress.env('LOGIN_URL')

Given('a unique attribute is associated with organisation units', () => {
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

Then(
    'it should be a selectable option in the organisation unit id scheme input',
    () => {
        cy.wait(['@orgUnitAttributesXHR'])
            .then(async xhr => JSON.parse(await xhr.response.body.text()))
            .then(({ attributes }) => {
                cy.get('[data-test-id="more-options-button"]').click()
                cy.get('[data-test-id="input-org-unit-id-scheme"]').then(
                    $orgUnitIdScheme => {
                        /**
                         * "Old school style"
                         * The export page hasn't been refactored yet
                         * The whole if-else will be replaced with the
                         * code in the else block once the export page
                         * has been refactored as well
                         */
                        if (
                            $orgUnitIdScheme
                                .find('> div')
                                .attr('class')
                                .match(/styles_formControl/)
                        ) {
                            $orgUnitIdScheme.find('button').click()
                            cy.get(
                                '[role="presentation"] [role="menuitem"]'
                            ).then($menuItems => {
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
                            })
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
