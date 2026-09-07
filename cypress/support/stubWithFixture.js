Cypress.Commands.add('stubWithFixture', ({ method = 'GET', url, fixture }) => {
    return cy.intercept(method, url, { fixture })
})
