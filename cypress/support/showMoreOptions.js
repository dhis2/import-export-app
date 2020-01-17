Cypress.Commands.add('showMoreOptions', () => {
    cy.get('[data-test="more-options-button"]').click()
    return cy
})
