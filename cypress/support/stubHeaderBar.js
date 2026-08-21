Cypress.Commands.add('stubHeaderBar', () => {
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
