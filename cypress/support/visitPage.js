Cypress.Commands.add('visitPage', (type, name) => {
    cy.visitWhenStubbed(Cypress.env('APP_URL'))
        .get(`[data-test="sidebar-link-${type}-${name}"]`)
        .click()
})
