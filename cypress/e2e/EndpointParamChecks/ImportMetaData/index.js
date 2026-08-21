import '../common/settingFormValues'
import { Before, Given, Then } from '@badeball/cypress-cucumber-preprocessor'

const metadataApi = /api\/metadata.json/
const tasksApi = /tasks/
const summaryApi = /taskSummaries/

Before(() => {
    cy.stubWithFixture({
        method: 'POST',
        url: metadataApi,
        fixture: 'metadataImportUpload',
    }).as('uploadXHR')

    cy.stubWithFixture({
        url: tasksApi,
        fixture: 'metadataImportTasks',
    }).as('tasksXHR')

    cy.stubWithFixture({
        url: summaryApi,
        fixture: 'metadataImportSummaries',
    }).as('tasksXHR')
})

Given('the user is on the meta data import page', () => {
    cy.visitPage('import', 'Metadata')
})

Then('the upload request is sent with the right parameters', () => {
    cy.wait('@uploadXHR').then((interception) => {
        cy.getComparisonData(interception.request.url).then(
            ({ actual, expected }) => {
                expect(actual).to.deep.equal(expected)
            }
        )
    })
})
