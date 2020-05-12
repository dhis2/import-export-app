import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given('a unique attribute is associated with organisation units', () => {
    cy.server()
        .stubWithFixture({
            url: /api\/\d{2}\/attributes\?filter=unique:eq:true&filter=organisationUnitAttribute:eq:true&fields=id,displayName&paging=false/,
            fixture: 'orgUnitAttributes',
        })
        .as('orgUnitAttributesXHR')
})

Given('the user is on the data import page', () => {
    cy.visitPage('import', 'data')
})

Given('the user is on the data export page', () => {
    cy.visitPage('export', 'data')
})

Then(
    'it should be a selectable option in the organisation unit id scheme input',
    () => {
        cy.showMoreOptions()
        cy.wait(['@orgUnitAttributesXHR'])
            .then(xhr => xhr.response.body)
            .then(({ attributes }) => {
                cy.get('[data-test="input-org-unit-id-scheme"]').click()
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
    }
)
