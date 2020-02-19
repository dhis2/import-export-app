Cypress.Commands.add('showMoreOptions', () => {
    cy.get('[data-test="interaction-more-options"]').click()
    return cy
})
