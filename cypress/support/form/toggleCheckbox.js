const toggleCheckbox = (name, label) => {
    cy.get(`[name="${name}"]`).parents('label').click()

    return cy
}

Cypress.Commands.add('toggleCheckbox', toggleCheckbox)
