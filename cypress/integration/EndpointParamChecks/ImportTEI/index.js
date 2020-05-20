import '../common/settingFormValues'
import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps'

const teiApi = /api\/trackedEntityInstances.json/
const tasksApi = /tasks/
const summaryApi = /taskSummaries/

Before(() => {
    cy.server()

    cy.stubWithFixture({
        method: 'POST',
        url: teiApi,
        fixture: 'teiImportUpload',
    }).as('uploadXHR')

    cy.stubWithFixture({
        url: tasksApi,
        fixture: 'teiImportTasks',
    }).as('tasksXHR')

    cy.stubWithFixture({
        url: summaryApi,
        fixture: 'teiImportSummaries',
    }).as('tasksXHR')
})

Given('the user is on the tracked entity instances import page', () => {
    cy.visitPage('import', 'tei')
})

Then('the upload request is sent with the right parameters', () => {
    cy.wait('@uploadXHR').then(xhr => {
        cy.getComparisonData(xhr.url).then(({ actual, expected }) => {
            expect(actual).to.deep.equal(expected)
        })
    })
})
