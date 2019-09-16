import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

const url = Cypress.env('APP_URL')

Given('I am on the home page', () => cy.visit(url))

Given('I am on the Metadata import page', () => {
    cy.visit(url)
        .get(`.styles_text__pVWFi:contains("Metadata Import")`)
        .click()
})

Then('I should see a card menu with 8 cards', () => {
    cy.get('.styles_item__2Q7Za').should('have.length', 8)
})

Then('the sidebar should contain a link to the Metadata import page', () => {
    cy.get(`.styles_text__pVWFi:contains("Metadata Import")`).should('exist')
})

Then('the sidebar should contain a link to the Data import page', () => {
    cy.get(`.styles_text__pVWFi:contains("Data Import")`).should('exist')
})

Then('the sidebar should contain a link to the Event import page', () => {
    cy.get(`.styles_text__pVWFi:contains("Event Import")`).should('exist')
})

Then('the sidebar should contain a link to the GML import page', () => {
    cy.get(`.styles_text__pVWFi:contains("GML Import")`).should('exist')
})

Then('the sidebar should contain a link to the Metadata export page', () => {
    cy.get(`.styles_text__pVWFi:contains("Metadata Export")`).should('exist')
})

Then('the sidebar should contain a link to the Metadata export page', () => {
    cy.get(`.styles_text__pVWFi:contains("Data Export")`).should('exist')
})

Then('the sidebar should contain a link to the Metadata export page', () => {
    cy.get(`.styles_text__pVWFi:contains("Event Export")`).should('exist')
})

Then(
    'the sidebar should contain a link to the Metadata Dependency export page',
    () => {
        cy.get(
            `.styles_text__pVWFi:contains("Metadata Dependency Export")`
        ).should('exist')
    }
)
