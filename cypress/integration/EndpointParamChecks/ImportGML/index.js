import '../common/settingFormValues'
import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps'

const dataApi = /api\/metadata\/gml/

Before(() => {
    cy.server()

    cy.stubWithFixture({
        method: 'POST',
        url: dataApi,
        fixture: 'gmlImportUpload',
    }).as('uploadXHR')
})

Given('the user is on the gml page', () => {
    cy.visitPage('import', 'gml')
})

Then('the upload request is sent with the right parameters', () => {
    cy.wait('@uploadXHR').then(xhr => {
        cy.getComparisonData(xhr.url).then(({ actual, expected }) => {
            expect(actual).to.deep.equal({
                ...expected,
                format: 'json',
            })
        })
    })
})
