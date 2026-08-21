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
        // dhis2DataTestPrefix: 'dhis2-dataexchange',
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

// const { defineConfig } = require('cypress')

// module.exports = defineConfig({
//     projectId: 'kfq27m',
//     e2e: {
//         baseUrl: 'http://localhost:3000',
//         specPattern: '**/*.feature',
//         video: false,
//         async setupNodeEvents(on, config) {
//             // @dhis2/cypress-plugins must be wired up first, otherwise the
//             // cucumber preprocessor plugin won't work correctly.
//             const {
//                 cucumberPreprocessor,
//                 chromeAllowXSiteCookies,
//             } = require('@dhis2/cypress-plugins')

//             await cucumberPreprocessor(on, config)
//             chromeAllowXSiteCookies(on, config)

//             return config
//         },

//     },
// })
