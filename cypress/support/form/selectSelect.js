const selectSelect = (dataTest, label) => {
    const inputSelector = `[data-test="${dataTest}"]`
    const valSelector = `[data-test="dhis2-uicore-singleselectoption"]:contains("${label}")`
    const backdropSelector = `[data-test="dhis2-uicore-layer"]`

    cy.get(inputSelector).click()

    // Yield the raw value straight off the matched option, in the same
    // chain that decides how to close the menu, instead of coordinating
    // across separate commands via an alias.
    return cy.get(valSelector).then(($option) => {
        const value = $option.attr('data-value')

        // The app's Menu component ignores clicks on an already-active
        // option (no onChange, no handleClose - see @dhis2-ui/select's
        // single-select/menu.js, which adds the "active" class here), so
        // clicking it would leave the dropdown open on top of whatever's
        // next. Close via the backdrop instead in that case.
        const closeMenu = $option.hasClass('active')
            ? cy.get(backdropSelector).click({ position: 'topLeft' })
            : cy.wrap($option).click()

        return closeMenu.then(() => value)
    })
}

Cypress.Commands.add('selectSelect', selectSelect)
