const selectSelect = (dataTest, value, label) => {
    cy.get(`[data-test="${dataTest}"]`)
        .find('button')
        .click()

    cy.get('body > div:last-child')
        .find('[role="menuitem"]')
        .find(`> div > div > div:contains("${label}")`)
        .click()

    return cy
}

Cypress.Commands.add('selectSelect', selectSelect)
