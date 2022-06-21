const getValueOfSelect = (dataTest) => {
    const inputSelector = `[data-test="${dataTest}"]`
    const curLabelSelector = `${inputSelector} [data-test="dhis2-uicore-singleselect"]`
    const backdropSelector = `[data-test="dhis2-uicore-layer"]`

    cy.get(curLabelSelector).then(($curLabelElement) => {
        const curLabel = $curLabelElement.text()
        cy.get(inputSelector).click()
        cy.get(
            `[data-test="dhis2-uicore-singleselectoption"]:contains("${curLabel}")`
        )
            .invoke('attr', 'data-value')
            .as('$$getValueOfSelect__value')
        cy.get(backdropSelector).click({ position: 'topLeft' })
    })

    return cy.get('@$$getValueOfSelect__value')
}

Cypress.Commands.add('getValueOfSelect', getValueOfSelect)
