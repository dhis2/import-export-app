const selectText = (name, value) => {
    cy.get(`[name="${name}"]`).type(value)
    return cy
}

Cypress.Commands.add('selectText', selectText)
