const deselectAllDataSets = () => {
    cy.get(`[data-test="input-data-sets"]`)
        .find('[class*="styles_actions"] > :last-child')
        .click()

    return cy
}

Cypress.Commands.add('deselectAllDataSets', deselectAllDataSets)
