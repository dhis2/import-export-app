import '../common/settingFormValues'
import { Before, Given, Then } from '@badeball/cypress-cucumber-preprocessor'

const teiApi = /api\/trackedEntityInstances.json/
const tasksApi = /tasks/
const summaryApi = /taskSummaries/

Before(() => {
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
    cy.visitPage('import', 'TEI')
})

Then('the upload request is sent with the right parameters', () => {
    cy.wait('@uploadXHR').then((interception) => {
        cy.getComparisonData(interception.request.url).then(
            ({ actual, expected }) => {
                expect(actual).to.deep.equal({
                    ...expected,
                    async: 'false',
                })
            }
        )
    })
})
