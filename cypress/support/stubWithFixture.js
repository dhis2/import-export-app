Cypress.Commands.add('stubWithFixture', ({ method = 'GET', url, fixture }) => {
    return cy.route({
        method,
        url,
        response: `fixture:${fixture}`,
    })
})
