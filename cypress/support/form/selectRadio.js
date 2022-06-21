const selectRadio = (name, value) => {
    cy.get(`[name="${name}"][value="${value}"]`).parents('label').click()

    return cy
}

Cypress.Commands.add('selectRadio', selectRadio)
