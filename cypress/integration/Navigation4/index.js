import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

const url = Cypress.env('APP_URL')

/**
 * Home page cards
 * ===============
 */
Given('I am on the home page', () => cy.visit(url))

Then('I should see a card menu with 8 cards', () =>
    cy.get('.styles_item__2Q7Za').should('have.length', 8)
)

/**
 * Sidebar links
 * =============
 */
Given('I am on the {string} page', name => {
    name === 'home'
        ? cy.visit(url)
        : cy
              .visit(url)
              .get(`.styles_text__pVWFi:contains("${name}")`)
              .click()
})

Then('the sidebar should contain links to all pages', names => {
    names.rows().forEach(name => {
        cy.get(`.styles_text__pVWFi:contains("${name}")`).should('exist')
    })
})
