const toggleCheckbox = (name, old) => {
    if (old) {
        cy.get(`[value="${name}"]`).click()
    } else {
        cy.get(`[name="${name}"]`)
            .parents('label')
            .click()
    }

    return cy
}

Cypress.Commands.add('toggleCheckbox', toggleCheckbox)
