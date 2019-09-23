import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

const loginUrl = Cypress.env('LOGIN_URL')

const getKeyBySide = side => (side === 'org units' ? 'orgUnit' : 'dataElement')

Given('the user is on the data {word} page', type => {
    cy.visitWhenStubbed(Cypress.env('APP_URL'))
        .get(`[data-test-id="sidebar-link-${type}-data"]`)
        .click()
})

Given(
    'an attribute is associated with {string} but not with {string}',
    (left, right) => {
        cy.server()

        if (left === 'org units') {
            cy.route({
                url: `${loginUrl}/api/attributes.json?paging=false&fields=id,displayName&filter=unique:eq:true&filter=organisationUnitAttribute:eq:true`,
                response: 'fx:orgUnitAttributes',
            }).as('attributesXHR')

            cy.route({
                url: `${loginUrl}/api/attributes.json?paging=false&fields=id,displayName&filter=unique:eq:true&filter=dataElementAttribute:eq:true`,
                response: { attributes: [] },
            })
        } else {
            cy.route({
                url: `${loginUrl}/api/attributes.json?paging=false&fields=id,displayName&filter=unique:eq:true&filter=dataElementAttribute:eq:true`,
                response: 'fx:dataElementAttributes',
            }).as('attributesXHR')

            cy.route({
                url: `${loginUrl}/api/attributes.json?paging=false&fields=id,displayName&filter=unique:eq:true&filter=organisationUnitAttribute:eq:true`,
                response: { attributes: [] },
            })
        }
    }
)

Then('it should not be an option in the id scheme input', () => {
    cy.wait('@attributesXHR')
        .then(async attributesXHR => {
            const { attributes } = JSON.parse(
                await attributesXHR.response.body.text()
            )

            return attributes
        })
        .then(nonCommonAttributes => {
            cy.get('[data-test-id="more-options-button"]').click()
            cy.get('[data-test-id="input-id-scheme"]').then($idScheme => {
                /**
                 * "Old school style"
                 * The export page hasn't been refactored yet
                 * The whole if-else will be replaced with the
                 * code in the else block once the export page
                 * has been refactored as well
                 */
                if (
                    $idScheme
                        .find('> div')
                        .attr('class')
                        .match(/styles_formControl/)
                ) {
                    $idScheme.find('button').click()
                    cy.get('[role="presentation"] [role="menuitem"]').then(
                        $menuItems => {
                            const allItemLabels = $menuItems
                                .toArray()
                                .map(el => el.innerText)
                            nonCommonAttributes.forEach(({ displayName }) => {
                                expect(
                                    allItemLabels.findIndex(
                                        label => label === displayName
                                    )
                                ).to.equal(-1)
                            })
                        }
                    )
                } else {

                /**
                 * "New style"
                 * After refatoring, using `ui-core` components
                 */
                    nonCommonAttributes.forEach(({ id }) => {
                        expect(
                            $idScheme
                                .find(`[value="ATTRIBUTE:${id}"]`)
                                .toArray()
                        ).to.have.lengthOf(0)
                    })
                }
            })
        })
})

Given('an attribute is associated with org units and data elements', () => {
    cy.server()

        .stubWithFixture({
            url: `${loginUrl}/api/attributes.json?paging=false&fields=id,displayName&filter=unique:eq:true&filter=dataElementAttribute:eq:true`,
            fixture: 'dataElementAttributes',
        })
        .as('dataElementAttributesXHR')

        .stubWithFixture({
            url: `${loginUrl}/api/attributes.json?paging=false&fields=id,displayName&filter=unique:eq:true&filter=organisationUnitAttribute:eq:true`,
            fixture: 'orgUnitAttributes',
        })
        .as('orgUnitAttributesXHR')
})

Then('it should be a selectable option in the id scheme input', () => {
    cy.wait(['@dataElementAttributesXHR', '@orgUnitAttributesXHR'])
        // extract responses from both attributes requests
        .then(async ([dataElementAttributesXHR, orgUnitAttributesXHR]) => {
            const dataElementAttributes = JSON.parse(
                await dataElementAttributesXHR.response.body.text()
            )

            const orgUnitAttributes = JSON.parse(
                await orgUnitAttributesXHR.response.body.text()
            )

            return {
                dataElement: dataElementAttributes.attributes,
                orgUnit: orgUnitAttributes.attributes,
            }
        })
        // find common attributes
        .then(attributes => {
            const commonAttributes = attributes.orgUnit.filter(
                ({ id }) =>
                    attributes.dataElement.findIndex(
                        ({ id: includeId }) => includeId === id
                    ) !== -1
            )

            expect(commonAttributes).to.have.length.of.at.least(1)

            return commonAttributes
        })
        // check for existence in DOM
        .then(attributes => {
            cy.get('[data-test-id="more-options-button"]').click()
            cy.get('[data-test-id="input-id-scheme"]').then($idScheme => {
                /**
                 * "Old school style"
                 * The export page hasn't been refactored yet
                 * The whole if-else will be replaced with the
                 * code in the else block once the export page
                 * has been refactored as well
                 */
                if (
                    $idScheme
                        .find('> div')
                        .attr('class')
                        .match(/styles_formControl/)
                ) {
                    $idScheme.find('button').click()
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
                            $idScheme
                                .find(`[value="ATTRIBUTE:${id}"]`)
                                .toArray()
                        ).to.have.lengthOf(1)
                    })
                }
            })
        })
})
