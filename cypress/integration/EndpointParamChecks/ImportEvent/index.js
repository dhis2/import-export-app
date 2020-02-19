import '../common/settingFormValues'
import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps'

const dataApi = /api\/events.(json|xml|csv)/
const tasksApi = /tasks/
const summaryApi = /taskSummaries/

Before(() => {
    cy.server()

    cy.stubWithFixture({
        method: 'POST',
        url: dataApi,
        fixture: 'eventImportUpload',
    }).as('uploadXHR')

    cy.stubWithFixture({
        url: tasksApi,
        fixture: 'eventImportTasks',
    }).as('tasksXHR')

    cy.stubWithFixture({
        url: summaryApi,
        fixture: 'eventImportSummaries',
    }).as('tasksXHR')
})

Given('the user is on the event page', () => {
    cy.visitPage('import', 'event')
})

Then('the upload request is sent with the right parameters', () => {
    cy.wait('@uploadXHR').then(xhr => {
        cy.getComparisonData(xhr.url).then(
            ({ actual, expected: allExpected }) => {
                const { format, ...expected } = allExpected

                expect(actual).to.deep.equal({
                    ...expected,
                    async: 'true',
                    skipFirst: 'true',
                    payloadFormat: format,
                })
            }
        )
    })
})
