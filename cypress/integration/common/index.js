import { Before, Given, When } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.stubHeaderBar()
})

Given('the more options are visible', () => {
    cy.showMoreOptions()
})

Given('a file has been selected', () => {
    cy.selectFile('input-file-upload', 'json', 'orgUnitAttributes.json')
})

When('the import form is submitted', () => {
    cy.get('[data-test="input-import-submit"]').click()
})

When('the import form is submitted as a dry run', () => {
    cy.get('[data-test="input-dry-run"]').click()
})

When('the export form is submitted', () => {
    const winOpenResponse = {
        document: {
            title: '',
            body: {
                innerHTML: '',
            }
        },
        onbeforeunload: cy.stub(),
        onabort: undefined,
        onerror: undefined,
    }

    cy.wrap(winOpenResponse).as('winOpenResponse')
    cy.window().then(win => {
        cy.stub(win, 'open', () => winOpenResponse).as('winOpenStub')
    })

    cy.get('[data-test="input-export-submit"]').click()
    cy.get('@winOpenResponse').then(response => {
        response.onbeforeunload()
    })
})
