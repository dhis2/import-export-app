const selectSelect = (dataTest, value, label) => {
    const selector = `[data-test="${dataTest}"]`

    cy.get(selector).then($el => {
        if (label) {
            cy.get(selector)
                .find('button')
                .click()
            cy.get('body > div:last-child')
                .find('[role="menuitem"]')
                .find(`> div > div > div:contains("${label}")`)
                .click()
        } else {
            cy.get(selector)
                .find('select')
                .select(value)
        }

        return cy
    })
}

Cypress.Commands.add('selectSelect', selectSelect)
