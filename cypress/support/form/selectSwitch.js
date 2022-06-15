const selectSwitch = (name, value) => {
    const selector = `[name="${name}"]`
    cy.get(selector).then(($sws) => {
        const $sw = $sws[0]
        if ($sw.checked && value == 'false') {
            $sw.click()
        } else if (!$sw.checked && value == 'true') {
            $sw.click()
        }
    })
    return cy
}

Cypress.Commands.add('selectSwitch', selectSwitch)
