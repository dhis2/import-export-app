const toggleCheckbox = (name, label) => {
    if (label) {
        cy.get()
    } else {
        cy.get(`[name="${name}"]`)
            .parents('label')
            .click()
    }

    return cy
}

Cypress.Commands.add('toggleCheckbox', toggleCheckbox)
