const selectSelect = (dataTest, value) => {
    const selector = `[data-test="${dataTest}"]`

    cy.get(selector).then($el => {
        cy.get(selector)
            .find('select')
            .select(value)

        return cy
    })
}

Cypress.Commands.add('selectSelect', selectSelect)
