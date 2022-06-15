const getValuesOfTransfer = (dataTest, label) => {
    const optionsContainerSelector = `[data-test="${dataTest}-pickedoptions"]`
    return cy
        .get(
            `${optionsContainerSelector} [data-test="dhis2-uicore-transferoption"]`
        )
        .then(($selectedOptions) => {
            const values = $selectedOptions
                .map((_, selectedOption) => {
                    const $selectedOption = Cypress.$(selectedOption)
                    const value = $selectedOption.attr('data-value')
                    return value
                })
                .toArray()

            return values
        })
}

Cypress.Commands.add('getValuesOfTransfer', getValuesOfTransfer)
