import '../common/settingFormValues'
import { Before, Given } from 'cypress-cucumber-preprocessor/steps'

const dataApi = /api\/dataValueSets.(json|xml|csv|adx|pdf)/

Before(() => {
    cy.server()
        .route('POST', dataApi, {})
        .as('uploadXHR')
})

Given('the user is on the data import page', () => {
    cy.visitPage('import', 'data')
})

Then('the upload request is sent with the right parameters', () => {
    cy.wait('@uploadXHR').then(xhr => {
        cy.getComparisonData(xhr.url).then(
            ({ actual, expected: origExpected }) => {
                const { format, ...rest } = origExpected

                const expected = {
                    ...rest,
                    format: format.slice(1),
                    async: 'true',
                }

                expect(actual).to.deep.equal(expected)
            }
        )
    })
})
