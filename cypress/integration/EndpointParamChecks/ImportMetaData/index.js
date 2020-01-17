import '../common/settingFormValues'
import { Before, Given } from 'cypress-cucumber-preprocessor/steps'

const metadataApi = /api\/metadata.json/

Before(() => {
    cy.server()
        .route('POST', metadataApi, {})
        .as('uploadXHR')
})

Given('the user is on the meta data import page', () => {
    cy.visitPage('import', 'metadata')
})

Then('the upload request is sent with the right parameters', () => {
    cy.wait('@uploadXHR').then(xhr => {
        cy.getComparisonData(xhr.url).then(
            ({ actual, expected: origExpected }) => {
                const { format, ...rest } = origExpected
                const expected = {
                    ...rest,
                    format: format.slice(1),
                }

                expect(actual).to.deep.equal(expected)
            }
        )
    })
})
