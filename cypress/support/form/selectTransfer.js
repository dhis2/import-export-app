const selectTransfer = (dataTest, label) => {
    const transferSelector = `[data-test="${dataTest}"]`
    const optionSelector = `[data-test="dhis2-uicore-transferoption"]:contains("${label}")`

    cy.get(`${transferSelector} ${optionSelector}`).dblclick()
    return cy
}

Cypress.Commands.add('selectTransfer', selectTransfer)
