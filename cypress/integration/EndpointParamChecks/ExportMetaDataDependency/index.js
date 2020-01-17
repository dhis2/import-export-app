import '../common/settingFormValues'
import { Before, Given } from 'cypress-cucumber-preprocessor/steps'

const dataSetsApi = /api\/\d+\/dataSets\?/
const eventApi = /api\/\d+\/([a-zA-Z0-9]+\/){2}metadata/

Before(() => {
    cy.server()

    cy.stubWithFixture({
        url: dataSetsApi,
        fixture: 'dataSets',
    }).as('dataSetsXHR')

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

Then('the download request is sent with the right parameters', () => {
    cy.window().then(win => {
        expect(win.assign).to.equal.calledOnce

        const call = win.assign.getCall(0)
        const url = call.args[0]
        const [objectType, objectList, format, compression] = url
            .match(
                /api\/\d+\/([^\/]+)\/([^\/]+)\/metadata(\.[^.]+)(\.[^.]+)?\?/
            )
            .slice(1)

        cy.getComparisonData(url).then(({ actual, expected, allData }) => {
            expect(expected.format).to.equal(format)
            expect(expected.compression).to.equal(compression || 'none')

            const updatedExpected = {
                download: 'true',
                skipSharing: (expected.sharing !== 'true').toString(),
            }

            expect(actual).to.deep.equal(updatedExpected)
        })
    })
})
