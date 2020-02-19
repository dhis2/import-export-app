import '../common/settingFormValues'
import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps'

const dataSetsApi = /api\/\d{2}\/dataSets\?/
const programsApi = /api\/\d{2}\/programs\?/
const eventApi = /api\/([a-zA-Z0-9]+\/){2}metadata/

Before(() => {
    cy.server()

    cy.stubWithFixture({
        url: dataSetsApi,
        fixture: 'dataSets',
    }).as('dataSetsXHR')

    cy.stubWithFixture({
        url: programsApi,
        fixture: 'programs',
    }).as('programsXHR')

    cy.route({
        url: eventApi,
        status: 404,
        response: {},
    }).as('downloadXHR')
})

Given('the user is on the meta data dependency export page', () => {
    cy.visitPage('export', 'metadata-dependency')
    cy.wait('@dataSetsXHR')
})

When('the export form is submitted', () => {
    cy.window().then(win => {
        const locationAssignStub = cy.stub().as('locationAssign')
        win.locationAssign = locationAssignStub
        cy.get('[data-test="input-export-submit"]').click()
    })
})

Then('the download request is sent with the right parameters', () => {
    cy.window().then(win => {
        cy.get('@locationAssign').then(locationAssignStub => {
            expect(locationAssignStub).to.be.calledOnce
            const call = locationAssignStub.getCall(0)
            const url = call.args[0]
            const [objectType, objectList, format, _, compression] = url
                .match(
                    /api\/([^\/]+)\/([^\/]+)\/metadata\.([^.]+)(\.([^.]+))?\?/
                )
                .slice(1)

            cy.getComparisonData(url).then(({ actual, expected, allData }) => {
                expect(expected.format).to.equal(format)
                expect(expected.compression).to.equal(compression || '')

                const updatedExpected = {
                    download: 'true',
                    skipSharing: expected.skipSharing,
                }

                expect(actual).to.deep.equal(updatedExpected)
            })
        })
    })
})
