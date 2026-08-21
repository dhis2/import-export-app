import '../common/settingFormValues'
import { Before, Given, Then } from '@badeball/cypress-cucumber-preprocessor'

const dataApi = /api\/dataValueSets.(json|xml|csv|adx|pdf)/
const tasksApi = /tasks/
const summaryApi = /taskSummaries/

Before(() => {
    cy.stubWithFixture({
        method: 'POST',
        url: dataApi,
        fixture: 'dataImportUpload',
    }).as('uploadXHR')

    cy.stubWithFixture({
        url: tasksApi,
        fixture: 'dataImportTasks',
    }).as('tasksXHR')

    cy.stubWithFixture({
        url: summaryApi,
        fixture: 'dataImportSummaries',
    }).as('tasksXHR')
})

Given('the user is on the data import page', () => {
    cy.visitPage('import', 'Data')
})

Then('the upload request is sent with the right parameters', () => {
    cy.wait('@uploadXHR').then((interception) => {
        cy.getComparisonData(interception.request.url).then(
            ({ actual, expected }) => {
                expect(actual).to.deep.equal({
                    ...expected,
                    async: 'true',
                })
            }
        )
    })
})
