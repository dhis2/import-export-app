import { enableAutoLogin, enableNetworkShim } from '@dhis2/cypress-commands'
import './form/index'
import './getAliases'
import './getComparisonData'
import './showMoreOptions'
import './stubWithFixture'
import './visitPage'
import './visitWhenStubbed'

// @dhis2/cypress-commands v10 reads dhis2BaseUrl/dhis2Username/dhis2Password
// (camelCase) from Cypress.env() by default. Local dev's cypress.env.json
// only ever provides the snake_case keys below; CI (see
// .github/workflows/*.yml) instead sets CYPRESS_dhis2BaseUrl etc. directly,
// which Cypress maps straight onto Cypress.env() in camelCase already.
// Only fall back to the snake_case value when the camelCase one isn't
// already set, so this never clobbers a value CI (or anyone using the
// camelCase env vars directly) has already provided with `undefined`.
const bridgeEnvFromSnakeCase = (camelKey, snakeKey) => {
    if (Cypress.env(camelKey) === undefined) {
        Cypress.env(camelKey, Cypress.env(snakeKey))
    }
}

bridgeEnvFromSnakeCase('dhis2BaseUrl', 'dhis2_base_url')
bridgeEnvFromSnakeCase('dhis2Username', 'dhis2_username')
bridgeEnvFromSnakeCase('dhis2Password', 'dhis2_password')

// Both enableAutoLogin() and enableNetworkShim() (and cypress.config.js's
// matching networkShim(on, ...) plugin registration) read the camelCase
// keys from Cypress.env() themselves once bridged above, so no explicit
// options need passing here any more.
enableAutoLogin()

// Records every request/response to the DHIS2 instance under
// cypress/fixtures/network/<apiVersion>/ in `networkMode=capture`, and
// replays those recorded responses (including the header bar's own
// api/me, me/dashboard, getModules, etc. - see
// @dhis2/cypress-plugins's networkShim getDefaultStaticResources()) in
// `networkMode=stub`. No-ops entirely in `networkMode=live` (the default),
// so requests hit the real server as normal. This replaces the old
// hand-rolled per-page cy.stubWithFixture/cy.intercept calls and the
// removed cypress/support/stubHeaderBar.js - run `yarn cypress:run:capture`
// once against a real instance before `yarn cypress:run:stub` will have
// anything to replay.
enableNetworkShim()
