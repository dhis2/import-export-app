const toggleCheckbox = name => {
    cy.get(`[value="${name}"]`).click()

    return cy
}

Cypress.Commands.add('toggleCheckbox', toggleCheckbox)
