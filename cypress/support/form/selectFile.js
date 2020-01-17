function hexStringToByte(str) {
    if (!str) {
        return new Uint8Array()
    }

    var a = []
    for (var i = 0, len = str.length; i < len; i += 2) {
        a.push(parseInt(str.substr(i, 2), 16))
    }

    return new Uint8Array(a)
}

const selectFile = (dataTest, fileType, fixture) => {
    return cy
        .fixture(fixture, 'hex')
        .then(fileHex => {
            const fileBytes = hexStringToByte(fileHex)
            const fileName = fixture.replace(/.+\//g, '')
            const testFile = new File([fileBytes], fileName, {
                type: fileType,
            })
            const dataTransfer = new DataTransfer()
            dataTransfer.items.add(testFile)

            return dataTransfer.files
        })
        .then(files => {
            cy.get(`[data-test="${dataTest}"] input`).as('element')
            cy.get('@element').then($el => ($el[0].files = files))
            cy.get('@element').trigger('change', { force: true })
            return cy
        })
}

Cypress.Commands.add('selectFile', selectFile)
