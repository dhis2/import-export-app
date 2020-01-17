import '../common/settingFormValues'
import { Before, Given } from 'cypress-cucumber-preprocessor/steps'

const dataApi = /api\/metadata\/gml/

Before(() => {
    cy.server()
        .route('POST', dataApi, {})
        .as('uploadXHR')
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
