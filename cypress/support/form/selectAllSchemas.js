const selectAllSchemas = () => {
    cy.get(`button[class*="Schemas_selectAllButton"]`).click()
    return cy
}

Cypress.Commands.add('selectAllSchemas', selectAllSchemas)
