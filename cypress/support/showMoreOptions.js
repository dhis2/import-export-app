Cypress.Commands.add('showMoreOptions', () => {
    cy.get('[data-test="interaction-more-options-header"]').click()
    return cy
})
