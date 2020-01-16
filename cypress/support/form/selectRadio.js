const selectRadio = (name, value, old) => {
    if (old) {
        cy.get(`[name="radioGroup-${name}"][value="${value}"]`).click({
            force: true,
        })

        return cy
    }

    cy.get(`[name="${name}"][value="${value}"]`)
        .parents('label') // label
        .click()

    return cy
}

Cypress.Commands.add('selectRadio', selectRadio)
