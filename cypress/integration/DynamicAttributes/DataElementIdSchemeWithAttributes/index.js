import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

const loginUrl = Cypress.env('LOGIN_URL')

Given('a unique attribute is associated with data elements', () => {
    cy.server()
        .stubWithFixture({
            url: `${loginUrl}/api/attributes.json?paging=false&fields=id,displayName&filter=unique:eq:true&filter=dataElementAttribute:eq:true`,
            fixture: 'dataElementAttributes',
        })
        .as('dataElementAttributesXHR')
})

Given('the user is on the data import page', () => {
    cy.visitPage('import', 'data')
})

Given('the user is on the data export page', () => {
    cy.visitPage('export', 'data')
})

Then(
    'it should be a selectable option in the data element id scheme input',
    () => {
        cy.wait(['@dataElementAttributesXHR'])
            .then(async xhr => JSON.parse(await xhr.response.body.text()))
            .then(({ attributes }) => {
                cy.get('[data-test="more-options-button"]').click()
                cy.get('[data-test="input-data-element-id-scheme"]').then(
                    $dataElementIdScheme => {
                        /**
                         * "Old school style"
                         * The export page hasn't been refactored yet
                         * The whole if-else will be replaced with the
                         * code in the else block once the export page
                         * has been refactored as well
                         */
                        if (
                            $dataElementIdScheme
                                .find('> div')
                                .attr('class')
                                .match(/styles_formControl/)
                        ) {
                            $dataElementIdScheme.find('button').click()
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