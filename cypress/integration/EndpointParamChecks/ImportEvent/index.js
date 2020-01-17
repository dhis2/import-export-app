import '../common/settingFormValues'
import { Before, Given } from 'cypress-cucumber-preprocessor/steps'

const dataApi = /api\/events.(json|xml|csv)/

Before(() => {
    cy.server()
        .route('POST', dataApi, {})
        .as('uploadXHR')
})

Given('the user is on the event page', () => {
    cy.visitPage('import', 'event')
})

Then('the upload request is sent with the right parameters', () => {
    cy.wait('@uploadXHR').then(xhr => {
        cy.getComparisonData(xhr.url).then(
            ({ actual, expected: allExpected }) => {
                const { format, ...rest } = allExpected
                const expected = {
                    ...rest,
                    async: 'true',
                    skipFirst: 'true',
                    payloadFormat: format.slice(1),
                }

                expect(actual).to.deep.equal(expected)
            }
        )
    })
})
