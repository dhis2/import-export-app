const selectAllDataSets = () => {
    cy.get('[data-test="input-data-set-picker-list-actions-addall"]').click()
    return cy
}

Cypress.Commands.add('selectAllDataSets', selectAllDataSets)
