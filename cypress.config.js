const {
    networkShim,
    chromeAllowXSiteCookies,
    cucumberPreprocessor,
} = require('@dhis2/cypress-plugins')
const { defineConfig } = require('cypress')

async function setupNodeEvents(on, config) {
    await cucumberPreprocessor(on, config)
    // networkShim's own default (config.env.dhis2BaseUrl, camelCase) is
    // never set in this app - cypress.env.json / --env only ever provide
    // the snake_case `dhis2_base_url` (see cypress/support/e2e.js's
    // matching bridge for enableNetworkShim/enableAutoLogin). Pass `hosts`
    // explicitly so capture/stub mode actually intercepts the real host
    // instead of matching nothing (`^undefined`).
    networkShim(on, { hosts: [config.env.dhis2_base_url] })
    chromeAllowXSiteCookies(on, config)
    return config
}

module.exports = defineConfig({
    video: false,
    projectId: 'kfq27m',

    env: {
        networkMode: 'live',
        dhis2ApiVersion: '44',
    },

    experimentalSessionAndOrigin: true,
    experimentalInteractiveRunEvents: true,
    e2e: {
        setupNodeEvents,
        baseUrl: 'http://localhost:3000',
        specPattern: [
            'cypress/e2e/**/*.feature.js',
            'cypress/e2e/**/*.feature',
        ],
    },
})

