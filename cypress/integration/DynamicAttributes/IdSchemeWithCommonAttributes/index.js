import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

const getKeyBySide = side => (side === 'org units' ? 'orgUnit' : 'dataElement')

Given('the user is on the data {word} page', type => {
    cy.visitWhenStubbed(`/`)
        .get(`[data-test="sidebar-link-data-${type}"]`)
        .click({ force: true })
})

Given(
    'a unique attribute is associated with {string} but not with {string}',
    (left, right) => {
        cy.server()

        if (left === 'org units') {
            cy.route({
                url: /api\/\d{2}\/attributes\?filter=unique:eq:true&filter=organisationUnitAttribute:eq:true&fields=id,displayName&paging=false/,
                response: 'fx:orgUnitAttributes',
            }).as('attributesXHR')

            cy.route({
                url: /api\/\d{2}\/attributes\?filter=unique:eq:true&filter=dataElementAttribute:eq:true&fields=id,displayName&paging=false/,
                response: {
                    attributes: [],
                },
            })
        } else {
            cy.route({
                url: /api\/\d{2}\/attributes\?filter=unique:eq:true&filter=dataElementAttribute:eq:true&fields=id,displayName&paging=false/,
                response: 'fx:dataElementAttributes',
            }).as('attributesXHR')

            cy.route({
                url: /api\/\d{2}\/attributes\?filter=unique:eq:true&filter=organisationUnitAttribute:eq:true&fields=id,displayName&paging=false/,
                response: {
                    attributes: [],
                },
            })
        }
    }
)

Then('it should not be an option in the id scheme input', () => {
    cy.showMoreOptions()
    cy.wait('@attributesXHR')
        .then(attributesXHR => {
            const { attributes } = attributesXHR.response.body
            return attributes
        })
        .then(nonCommonAttributes => {
            // check for existence in DOM
            cy.get('[data-test="input-id-scheme"]').click()
            cy.get('[data-test="dhis2-uicore-select-menu"]').then(
                $selectMenu => {
                    nonCommonAttributes.forEach(({ id }) => {
                        expect(
                            $selectMenu
                                .find(`[data-value="ATTRIBUTE:${id}"]`)
                                .toArray()
                        ).to.have.lengthOf(0)
                    })
                }
            )
        })
})

Given(
    'a unique attribute is associated with org units and data elements',
    () => {
        cy.server()

            .stubWithFixture({
                url: /api\/\d{2}\/attributes\?filter=unique:eq:true&filter=dataElementAttribute:eq:true&fields=id,displayName&paging=false/,
                fixture: 'dataElementAttributes',
            })
            .as('dataElementAttributesXHR')

            .stubWithFixture({
                url: /api\/\d{2}\/attributes\?filter=unique:eq:true&filter=organisationUnitAttribute:eq:true&fields=id,displayName&paging=false/,
                fixture: 'orgUnitAttributes',
            })
            .as('orgUnitAttributesXHR')
    }
)

Then('it should be a selectable option in the id scheme input', () => {
    cy.showMoreOptions()
    cy.wait(['@dataElementAttributesXHR', '@orgUnitAttributesXHR'])
        .then(([dataElementAttributesXHR, orgUnitAttributesXHR]) => {
            // extract responses from both attributes requests
            const dataElementAttributes = dataElementAttributesXHR.response.body
            const orgUnitAttributes = orgUnitAttributesXHR.response.body

            return {
                dataElement: dataElementAttributes.attributes,
                orgUnit: orgUnitAttributes.attributes,
            }
        })
        .then(attributes => {
            // find common attributes
            const commonAttributes = attributes.orgUnit.filter(
                ({ id }) =>
                    attributes.dataElement.findIndex(
                        ({ id: includeId }) => includeId === id
                    ) !== -1
            )

            expect(commonAttributes).to.have.length.of.at.least(1)

            return commonAttributes
        })
        .then(attributes => {
            // check for existence in DOM
            cy.get('[data-test="input-id-scheme"]').click()
            cy.get('[data-test="dhis2-uicore-select-menu"]').then(
                $selectMenu => {
                    attributes.forEach(({ id }) => {
                        expect(
                            $selectMenu
                                .find(`[data-value="ATTRIBUTE:${id}"]`)
                                .toArray()
                        ).to.have.lengthOf(1)
                    })
                }
            )
        })
})
