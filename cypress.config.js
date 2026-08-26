const {
    networkShim,
    chromeAllowXSiteCookies,
    cucumberPreprocessor,
} = require('@dhis2/cypress-plugins')
const { defineConfig } = require('cypress')

async function setupNodeEvents(on, config) {
    await cucumberPreprocessor(on, config)
    networkShim(on, config)
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

