Cypress.Commands.add('visitPage', (type, name) => {
    return (
        cy
            .visitWhenStubbed('/')
            // The default 4000ms command timeout is too tight for this step in
            // CI: it isn't just a DOM assertion, it's waiting on the whole app
            // to boot (webpack-dev-server serving/compiling the bundle, plus
            // the client-side auth check) after a real navigation. That boot
            // time is far more variable on CI runners than on a warm local
            // machine, and is worst on the very first navigation of a run
            // (e.g. DynamicAttributes/DataElementIdSchemeWithAttributes's
            // "importing data" scenario, which runs before webpack/the app has
            // had a chance to warm up) - so give it a generous timeout here
            // rather than a global one that would mask real bugs elsewhere.
            .get('[data-test="dhis2-uicore-menulist"]', { timeout: 30000 })
            .find(`a:contains("${name} ${type}")`)
            .click()
    )
})
