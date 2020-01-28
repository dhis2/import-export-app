import { Before, Given, When } from 'cypress-cucumber-preprocessor/steps'

Before(() => cy.login())

Given('the more options are visible', () => {
    cy.showMoreOptions()
})

Given('a file has been selected', () => {
    cy.selectFile('input-upload', 'json', 'orgUnitAttributes.json')
})

When('the form is submitted', () => {
    cy.get('form button[type="submit"]').click()
})

When('the export form is submitted', () => {
    cy.get('button[type="submit"]').click()
})
