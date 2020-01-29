Cypress.Commands.add('visitPage', (type, name) => {
    cy.visitWhenStubbed(Cypress.env('APP_URL'))
        .get(`[data-test="sidebar-link-${type}-${name}"]`)
        .click()

    /**
     * Prepare a stubs container that
     * cypress can attach functions to
     * which will then be used by the app
     * (like `src/helpers/url.js`)
     */
    cy.window().then(win => (win.stubs = {}))
})
