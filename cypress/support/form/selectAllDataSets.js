const selectAllDataSets = () => {
    cy.get(
        '[data-test="input-data-set-picker-list-actions-select-all"]'
    ).click()
    return cy
}

Cypress.Commands.add('selectAllDataSets', selectAllDataSets)
