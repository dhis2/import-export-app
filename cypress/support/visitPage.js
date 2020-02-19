Cypress.Commands.add('visitPage', (type, name) => {
    cy.visitWhenStubbed('/')
        .get(`[data-test="sidebar-link-${name}-${type}"]`)
        .click({ force: true })
})
