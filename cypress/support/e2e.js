import { enableAutoLogin } from '@dhis2/cypress-commands'
import './form/index'
import './getAliases'
import './getComparisonData'
import './showMoreOptions'
import './stubWithFixture'
import './visitPage'
import './visitWhenStubbed'
import './stubHeaderBar'

// @dhis2/cypress-commands v10 reads dhis2BaseUrl/dhis2Username/dhis2Password
// (camelCase) from Cypress.env() by default, but this app's env vars have
// always used the snake_case keys below. Pass them through explicitly so
// enableAutoLogin() doesn't silently fall back to undefined credentials.
enableAutoLogin({
    username: Cypress.env('dhis2_username'),
    password: Cypress.env('dhis2_password'),
    baseUrl: Cypress.env('dhis2_base_url'),
})
