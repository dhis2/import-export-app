Cypress.Commands.add('getAliases', (...aliases) => {
    cy.wrap([]).as('__getAliases_values')

    aliases.forEach(alias => {
        cy.get('@__getAliases_values').then(curValues => {
            cy.get(alias).then(curValue => {
                cy.wrap([...curValues, curValue]).as('__getAliases_values')
            })
        })
    })

    return cy.get('@__getAliases_values')
})
