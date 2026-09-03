import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

// Read the camelCase key (bridged from the snake_case local-dev env
// var, or set directly by CI - see cypress/support/e2e.js) rather than
// the snake_case one directly, so this resolves in both environments.
const loginUrl = Cypress.env('dhis2BaseUrl')

const getKeyBySide = (side) =>
    side === 'org units' ? 'orgUnit' : 'dataElement'

Given('the user is on the data {word} page', (type) => {
    cy.visitPage(type, 'Data')
})

Given(
    'a unique attribute is associated with {string} but not with {string}',
    (left, right) => {
        if (left === 'org units') {
            cy.intercept(
                `${loginUrl}/api/attributes.json?paging=false&fields=id,displayName&filter=unique:eq:true&filter=organisationUnitAttribute:eq:true`,
                { fixture: 'orgUnitAttributes' }
            ).as('attributesXHR')

            cy.intercept(
                `${loginUrl}/api/attributes.json?paging=false&fields=id,displayName&filter=unique:eq:true&filter=dataElementAttribute:eq:true`,
                { attributes: [] }
            )
        } else {
            cy.intercept(
                `${loginUrl}/api/attributes.json?paging=false&fields=id,displayName&filter=unique:eq:true&filter=dataElementAttribute:eq:true`,
                { fixture: 'dataElementAttributes' }
            ).as('attributesXHR')

            cy.intercept(
                `${loginUrl}/api/attributes.json?paging=false&fields=id,displayName&filter=unique:eq:true&filter=organisationUnitAttribute:eq:true`,
                { attributes: [] }
            )
        }
    }
)

Then('it should not be an option in the id scheme input', () => {
    cy.showMoreOptions()
    cy.wait('@attributesXHR')
        .then((attributesXHR) => {
            const { attributes } = attributesXHR.response.body
            return attributes
        })
        .then((nonCommonAttributes) => {
            // check for existence in DOM
            cy.get('[data-test="input-id-scheme"]').click()
            cy.get('[data-test="dhis2-uicore-select-menu-menuwrapper"]').then(
                ($selectMenu) => {
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
        cy.stubWithFixture({
            url: `${loginUrl}/api/attributes.json?paging=false&fields=id,displayName&filter=unique:eq:true&filter=dataElementAttribute:eq:true`,
            fixture: 'dataElementAttributes',
        }).as('dataElementAttributesXHR')

        cy.stubWithFixture({
            url: `${loginUrl}/api/attributes.json?paging=false&fields=id,displayName&filter=unique:eq:true&filter=organisationUnitAttribute:eq:true`,
            fixture: 'orgUnitAttributes',
        }).as('orgUnitAttributesXHR')
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
        .then((attributes) => {
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
        .then((attributes) => {
            // check for existence in DOM
            cy.get('[data-test="input-id-scheme"]').click()
            cy.get('[data-test="dhis2-uicore-select-menu-menuwrapper"]').then(
                ($selectMenu) => {
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
