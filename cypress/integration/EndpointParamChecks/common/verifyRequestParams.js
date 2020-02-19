import { Then } from 'cypress-cucumber-preprocessor/steps'

Then('the upload request is sent with the right parameters', () => {
    cy.wait('@uploadXHR').then(xhr => {
        cy.getComparisonData(xhr.url).then(({ actual, expected }) => {
            expect(actual).to.deep.equal(expected)
        })
    })
})

Then('the download request is sent with the right parameters', () => {
    cy.window().then(win => {
        expect(win.assign).to.be.calledOnce

        const call = win.assign.getCall(0)
        const url = call.args[0]

        cy.getComparisonData(url).then(({ actual, expected }) => {
            expect(actual).to.deep.equal(expected)
        })
    })
})
