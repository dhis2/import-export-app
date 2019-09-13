import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

const url = 'http://localhost:3000'

Given('I am on the home page', () => {
    cy.visit(url)
})

Given('I am on the {string} {word} page', (name, type) => {
    const capitalizedType = type === 'import' ? 'Import' : 'Export'
    const textSelector = `${name} ${capitalizedType}`

    cy.visit(url)
        .get(`.styles_text__pVWFi:contains("${textSelector}")`)
        .click()
})

Then('I should see a card menu with 8 cards', () => {
    cy.get('.styles_item__2Q7Za').should('have.length', 8)
})

Then(
    'the sidebar should contain a link to the {string} {word} page',
    (name, type) => {
        const capitalizedType = type === 'import' ? 'Import' : 'Export'
        const textSelector = `${name} ${capitalizedType}`

        cy.get(`.styles_text__pVWFi:contains("${textSelector}")`).should(
            'exist'
        )
    }
)
