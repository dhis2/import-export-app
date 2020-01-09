const selectAllDataSets = () => {
    cy.get(
        '[data-test="input-data-sets"] [data-test="checkboxgroup-selectall"] button'
    ).click()

    return cy
}

Cypress.Commands.add('selectAllDataSets', selectAllDataSets)
