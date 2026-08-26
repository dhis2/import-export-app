import { enableAutoLogin, enableNetworkShim } from '@dhis2/cypress-commands'
import './form/index'
import './getAliases'
import './getComparisonData'
import './showMoreOptions'
import './stubWithFixture'
import './visitPage'
import './visitWhenStubbed'

// @dhis2/cypress-commands v10 reads dhis2BaseUrl/dhis2Username/dhis2Password
// (camelCase) from Cypress.env() by default, but this app's env vars have
// always used the snake_case keys below. Pass them through explicitly so
// enableAutoLogin() doesn't silently fall back to undefined credentials.
enableAutoLogin({
    username: Cypress.env('dhis2_username'),
    password: Cypress.env('dhis2_password'),
    baseUrl: Cypress.env('dhis2_base_url'),
})

// enableNetworkShim() (and cypress.config.js's matching networkShim(on, ...)
// plugin registration) also expect the camelCase `dhis2BaseUrl` - bridge it
// from the same snake_case env var for the same reason as enableAutoLogin
// above, before enableNetworkShim() reads it.
Cypress.env('dhis2BaseUrl', Cypress.env('dhis2_base_url'))

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
