Cypress.Commands.add('stubHeaderBar', () => {
    cy.server()

    cy.route({
        url: /api\/\d{2}\/system\/info/,
        response: 'fixture:HeaderBar/systemInfo',
    }).as('systemInfo')

    cy.route({
        url: /api\/\d{2}\/me/,
        response: 'fixture:HeaderBar/me',
    }).as('me')

    cy.route({
        url: /dhis-web-commons\/menu\/getModules.action/,
        response: 'fixture:HeaderBar/getModules',
    }).as('modules')

    cy.route({
        url: /api\/\d{2}\/me\/dashboard/,
        response: 'fixture:HeaderBar/dashboard',
    }).as('dashboard')

    cy.route({
        url: /api\/\d{2}\/staticContent\/logo_banner/,
        response: 'fixture:HeaderBar/logo_banner',
    }).as('logo_banner')

    cy.route({
        url: /api\/\d{2}\/userSettings/,
        response: 'fixture:HeaderBar/userSettings',
    }).as('user_settings')
})
