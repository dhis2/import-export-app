Cypress.Commands.add('visitWhenStubbed', (url, options = {}) => {
    return cy
        .readFile('cypress/assets/unfetch.umd.js', { log: false })
        .then(content => {
            return cy.visit(url, {
                ...options,
                onBeforeLoad: win => {
                    delete win.fetch
                    win.eval(content)
                    win.fetch = win.unfetch
                    options.onBeforeLoad && options.onBeforeLoad(win)
                },
            })
        })
})
