const {
    networkShim,
    chromeAllowXSiteCookies,
    cucumberPreprocessor,
} = require('@dhis2/cypress-plugins')
const { defineConfig } = require('cypress')

async function setupNodeEvents(on, config) {
    await cucumberPreprocessor(on, config)
    // networkShim's own default (config.env.dhis2BaseUrl, camelCase) isn't
    // always set: local dev's cypress.env.json / --env only ever provide
    // the snake_case `dhis2_base_url` (see cypress/support/e2e.js's
    // matching bridge for enableNetworkShim/enableAutoLogin), while CI
    // (see .github/workflows/*.yml) sets `CYPRESS_dhis2BaseUrl` directly,
    // which Cypress maps straight onto `config.env.dhis2BaseUrl`. Prefer
    // whichever is actually set instead of assuming one convention, so
    // `hosts` is never accidentally `[undefined]` in either environment.
    const dhis2BaseUrl = config.env.dhis2BaseUrl || config.env.dhis2_base_url
    networkShim(on, { hosts: [dhis2BaseUrl] })
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
