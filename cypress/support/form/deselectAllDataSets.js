const deselectAllDataSets = () => {
    cy.get('[data-test="input-data-set-picker-list-actions-clear-all"]').click()
    return cy
}

Cypress.Commands.add('deselectAllDataSets', deselectAllDataSets)
