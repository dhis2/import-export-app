Cypress.Commands.add('visitPage', (type, name) => {
    cy.visitWhenStubbed('/')
        .get('[data-test="dhis2-uicore-menulist"]')
        .find(`a:contains("${name} ${type}")`)
        .click()
})
