import { Given, When } from '@badeball/cypress-cucumber-preprocessor'

Given('the more options are visible', () => {
    cy.showMoreOptions()
})

Given('a file has been selected', () => {
    cy.attachFile('input-file-upload', 'json', 'orgUnitAttributes.json')
})

When('the import form is submitted', () => {
    cy.get('[data-test="input-import-submit"]').click()
})

When('the import form is submitted as a dry run', () => {
    cy.get('[data-test="input-dry-run"]').click()
})
