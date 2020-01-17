const deselectAllSchemas = () => {
    cy.get(`button[class*="Schemas_selectAllButton"] + button`).click()
    return cy
}

Cypress.Commands.add('deselectAllSchemas', deselectAllSchemas)
