import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps'

const loginUrl = Cypress.env('LOGIN_URL')

Before(() => {
    cy.server()
        .stubWithFixture({
            url: `${loginUrl}/api/attributes.json?paging=false&fields=id,displayName&filter=unique:eq:true&filter=dataElementAttribute:eq:true`,
            fixture: 'dataElementAttributes',
        })
        .as('dataElementAttributesXHR')
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

Given('an attribute is associated with data elements', () => {
    cy.wait(['@dataElementAttributesXHR'])
        .then(async xhr => JSON.parse(await xhr.response.body.text()))
        .as('dataElementAttributes')

    cy.get('@dataElementAttributes').then(({ attributes }) => {
        expect(attributes).to.have.length.of.at.least(1)
    })
})

Then(
    'it should be a selectable option in the data element id scheme input',
    () => {
        cy.get('@dataElementAttributes').then(({ attributes }) => {
            cy.get('[data-test-id="more-options-button"]').click()
            cy.get('[data-test-id="input-data-element-id-scheme"]').then(
                $dataElementIdScheme => {
                    if (
                        $dataElementIdScheme
                            .find('> div')
                            .attr('class')
                            .match(/styles_formControl/)
                    ) {
                        /**
                         * "Old school style"
                         * The export page hasn't been refactored yet
                         */
                        $dataElementIdScheme.find('button').click()
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
                                $dataElementIdScheme
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
