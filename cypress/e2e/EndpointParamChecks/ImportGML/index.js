import '../common/settingFormValues'
import { Before, Given, Then } from '@badeball/cypress-cucumber-preprocessor'

const dataApi = /api\/metadata\/gml/

Before(() => {
    cy.stubWithFixture({
        method: 'POST',
        url: dataApi,
        fixture: 'gmlImportUpload',
    }).as('uploadXHR')
})

Given('the user is on the gml page', () => {
    cy.visitPage('import', 'GML')
})

Then('the upload request is sent with the right parameters', () => {
    cy.wait('@uploadXHR').then((interception) => {
        cy.getComparisonData(interception.request.url).then(
            ({ actual, expected }) => {
                expect(actual).to.deep.equal({
                    ...expected,
                    format: 'json',
                })
            }
        )
    })
})
