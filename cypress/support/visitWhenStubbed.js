Cypress.Commands.add('visitWhenStubbed', (url, options = {}) => {
    return cy.visit(url, {
        ...options,
        onBeforeLoad: win => {
            delete win.fetch
            options.onBeforeLoad && options.onBeforeLoad(win)
        },
    })
})
