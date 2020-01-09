const deselectAllDataSets = () => {
    cy.get(
        '[data-test="input-data-sets"] [data-test="checkboxgroup-clearall"] button'
    ).click()

    return cy
}

Cypress.Commands.add('deselectAllDataSets', deselectAllDataSets)
