const selectSelect = (dataTest, label) => {
    const inputSelector = `[data-test="${dataTest}"]`
    const curValueSelector = `${inputSelector} [data-test="dhis2-uicore-singleselect"]`
    const valSelector = `[data-test="dhis2-uicore-singleselectoption"]:contains("${label}")`
    const backdropSelector = `[data-test="dhis2-uicore-backdrop"]`

    cy.get(curValueSelector).then(($curValueElement) => {
        const curValue = $curValueElement.text()

        if (label === curValue) {
            return
        }

        cy.get(inputSelector).click()
        cy.get(valSelector).click()
    })

    return cy
}

Cypress.Commands.add('selectSelect', selectSelect)
