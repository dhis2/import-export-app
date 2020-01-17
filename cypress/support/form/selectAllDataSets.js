const selectAllDataSets = () => {
    cy.get(`[data-test="input-data-sets"]`)
        .find('[class*="styles_actions"] > :first-child')
        .click()

    return cy
}

Cypress.Commands.add('selectAllDataSets', selectAllDataSets)
