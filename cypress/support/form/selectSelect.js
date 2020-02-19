const selectSelect = (dataTest, value) => {
    const inputSelector = `[data-test="${dataTest}"]`
    const valSelector = `[data-test="dhis2-uicore-singleselectoption"][data-value="${value}"]`
    const backdropSelector = `[data-test="dhis2-uicore-backdrop"]`

    cy.get(inputSelector).click()
    cy.get(valSelector).click({ force: true })
    cy.get('body', { log: false }).then($body => {
        if ($body.find(backdropSelector, { log: false }).length > 0) {
            cy.get(backdropSelector).click('topRight', { log: false })
        }
    })

    return cy
}

Cypress.Commands.add('selectSelect', selectSelect)
