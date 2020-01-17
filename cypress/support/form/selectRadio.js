const selectRadio = (name, value) => {
    cy.get(`[name="radioGroup-${name}"][value="${value}"]`).click({
        force: true,
    })

    return cy
}

Cypress.Commands.add('selectRadio', selectRadio)
