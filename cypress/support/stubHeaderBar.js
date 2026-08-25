Cypress.Commands.add('stubHeaderBar', () => {
    // Only stub the header bar chrome in `stub` mode. In `live` (and
    // `capture`) mode these requests should hit the real server so that
    // NetworkShim can capture them, e.g. api/me.
    if (Cypress.env('networkMode') !== 'stub') {
        return
    }

    cy.intercept(/api\/\d{2}\/system\/info/, {
        fixture: 'HeaderBar/systemInfo',
    }).as('systemInfo')

    cy.intercept(/api\/\d{2}\/me/, { fixture: 'HeaderBar/me' }).as('me')

    cy.intercept(/dhis-web-commons\/menu\/getModules.action/, {
        fixture: 'HeaderBar/getModules',
    }).as('modules')

    cy.intercept(/api\/\d{2}\/me\/dashboard/, {
        fixture: 'HeaderBar/dashboard',
    }).as('dashboard')

    cy.intercept(/api\/\d{2}\/staticContent\/logo_banner/, {
        fixture: 'HeaderBar/logo_banner',
    }).as('logo_banner')

    cy.intercept(/api\/\d{2}\/userSettings/, {
        fixture: 'HeaderBar/userSettings',
    }).as('user_settings')
})
