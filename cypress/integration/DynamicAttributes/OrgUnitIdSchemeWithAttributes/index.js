import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

const loginUrl = Cypress.env('dhis2_base_url')

Given('a unique attribute is associated with organisation units', () => {
    cy.server()
        .stubWithFixture({
            url: `${loginUrl}/api/attributes.json?paging=false&fields=id,displayName&filter=unique:eq:true&filter=organisationUnitAttribute:eq:true`,
            fixture: 'orgUnitAttributes',
        })
        .as('orgUnitAttributesXHR')
})

Given('the user is on the data import page', () => {
    cy.visitPage('import', 'Data')
})

Given('the user is on the data export page', () => {
    cy.visitPage('export', 'Data')
})

Then(
    'it should be a selectable option in the organisation unit id scheme input',
    () => {
        cy.showMoreOptions()
        cy.wait(['@orgUnitAttributesXHR'])
            .then(xhr => xhr.response.body)
            .then(({ attributes }) => {
                cy.get('[data-test="input-org-unit-id-scheme"]').click()
                cy.get(
                    '[data-test="dhis2-uicore-select-menu-menuwrapper"]'
                ).then($selectMenu => {
                    attributes.forEach(({ id }) => {
                        expect(
                            $selectMenu
                                .find(`[data-value="ATTRIBUTE:${id}"]`)
                                .toArray()
                        ).to.have.lengthOf(1)
                    })
                })
            })
    }
)
