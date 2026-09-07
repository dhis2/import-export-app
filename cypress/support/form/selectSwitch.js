const selectSwitch = (name, value) => {
    const selector = `[name="${name}"]`

    cy.get('body').then(($body) => {
        if ($body.find(selector).length === 0) {
            // Some switches are gated behind a <WithAuthority> check (e.g.
            // skipAudit needs F_SKIP_DATA_IMPORT_AUDIT/ALL) and won't
            // render for every user - in live networkMode that depends on
            // the real logged-in user's real authorities, not a fixture.
            // A missing switch is already in its (false) default state,
            // so only fail if we were actually asked to turn it on -
            // otherwise this would silently hide a real naming bug.
            if (value == 'true') {
                throw new Error(
                    `selectSwitch: no element found for [name="${name}"], but asked to set it to true`
                )
            }
            return
        }

        const $sw = $body.find(selector)[0]
        if ($sw.checked && value == 'false') {
            $sw.click()
        } else if (!$sw.checked && value == 'true') {
            $sw.click()
        }
    })

    return cy
}

Cypress.Commands.add('selectSwitch', selectSwitch)
