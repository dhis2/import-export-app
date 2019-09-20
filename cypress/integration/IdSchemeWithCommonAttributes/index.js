import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps'

const loginUrl = Cypress.env('LOGIN_URL')

const getKeyBySide = side => (side === 'org units' ? 'orgUnit' : 'dataElement')

const collectAttributesFromResponses = () => {
    cy.wait(['@dataElementAttributesXHR', '@orgUnitAttributesXHR'])
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
        .as('attributes')
}

Before(() => {
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

Given('the user is on the data {word} page', type => {
    cy.visitWhenStubbed(Cypress.env('APP_URL'))
        .get(`[data-test-id="sidebar-link-${type}-data"]`)
        .click()
})

Given('an attribute is associated with org units and data elements', () => {
    collectAttributesFromResponses()

    cy.get('@attributes')
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
        .as('commonAttributes')
})

Given(
    'an attribute is associated with {string} but not with {string}',
    (left, right) => {
        collectAttributesFromResponses()

        cy.get('@attributes')
            .then(attributes => {
                const possibleAttributes = attributes[getKeyBySide(left)]
                const excludeAttributes = attributes[getKeyBySide(right)]
                const nonCommonAttributes = possibleAttributes.filter(
                    ({ id }) => {
                        return (
                            excludeAttributes.findIndex(
                                ({ id: excludeId }) => excludeId === id
                            ) === -1
                        )
                    }
                )

                expect(nonCommonAttributes).to.have.length.of.at.least(1)

                return nonCommonAttributes
            })
            .as('nonCommonAttributes')
    }
)

Then('it should not be an option in the id scheme input', () => {
    cy.get('@nonCommonAttributes').then(nonCommonAttributes => {
        cy.get('[data-test-id="more-options-button"]').click()
        cy.get('[data-test-id="input-id-scheme"]').then($idScheme => {
            if (
                $idScheme
                    .find('> div')
                    .attr('class')
                    .match(/styles_formControl/)
            ) {
                /**
                 * "Old school style"
                 * The export page hasn't been refactored yet
                 */
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
                        $idScheme.find(`[value="ATTRIBUTE:${id}"]`).toArray()
                    ).to.have.lengthOf(0)
                })
            }
        })
    })
})

Then('it should be a selectable option in the id scheme input', () => {
    cy.get('@commonAttributes').then(attributes => {
        cy.get('[data-test-id="more-options-button"]').click()
        cy.get('[data-test-id="input-id-scheme"]').then($idScheme => {
            if (
                $idScheme
                    .find('> div')
                    .attr('class')
                    .match(/styles_formControl/)
            ) {
                /**
                 * "Old school style"
                 * The export page hasn't been refactored yet
                 */
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
                        $idScheme.find(`[value="ATTRIBUTE:${id}"]`).toArray()
                    ).to.have.lengthOf(1)
                })
            }
        })
    })
})
