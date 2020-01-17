import '../common/settingFormValues'
import { Before, Given } from 'cypress-cucumber-preprocessor/steps'

const orgUnitsFirstLevelApi = /api\/\d+\/organisationUnits\?filter=id:in:[ImspTQPwCqd]&fields=:all,displayName,path,children[id,displayName,path,children::isNotEmpty]&paging=false&format=json/
const orgUnitsRootApi = /api\/\d+\/organisationUnits\?fields=id,path,displayName,children::isNotEmpty&level=1&paging=false/
const programsApi = /api\/\d+\/programs\?/
const programStagesApi = /api\/\d+\/programs\/[a-zA-Z0-9]+\.json/
const eventApi = /api\/\d+\/dataValueSets\.(json|xml|csv)/

Before(() => {
    cy.server()

    cy.stubWithFixture({
        url: orgUnitsRootApi,
        fixture: 'orgUnitsRoot',
    }).as('orgUnitsRootXHR')

    cy.stubWithFixture({
        url: orgUnitsFirstLevelApi,
        fixture: 'orgUnitsFirstLevel',
    }).as('orgUnitsFirstLevelXHR')

    cy.stubWithFixture({
        url: programsApi,
        fixture: 'programs',
    }).as('programsXHR')

    cy.stubWithFixture({
        url: programStagesApi,
        fixture: 'programStages',
    }).as('programStagesXHR')

    cy.route({
        url: eventApi,
        status: 404,
        response: {},
    }).as('downloadXHR')
})

Given('the user is on the event export page', () => {
    cy.visitPage('export', 'event')
    cy.wait('@programsXHR')
    cy.wait('@programStagesXHR')
})

Given('the Sierra Leone org unit has been selected', () => {
    cy.get(
        '[data-test="input-org-unit-tree"] [data-test="tree-node-label"]:contains("Sierra Leone")'
    ).click()

    cy.get('@defaultData').then(defaultData => {
        cy.wrap({ ...defaultData, orgUnit: 'ImspTQPwCqd' }).as('defaultData')
    })
})

Given('the user expands the root level of the org unit tree', () => {
    cy.get(
        '[data-test="input-org-unit-tree"] [data-test="tree-node-icon"]'
    ).click()
})

When('the user selects the "Bo" org unit', () => {
    cy.get(
        '[data-test="input-org-unit-tree"] [data-test="tree-node-label"]:contains("Bo")'
    )
        .first()
        .click()

    cy.get('@defaultData').then(defaultData => {
        cy.wrap({
            ...defaultData,
            orgUnit: 'O6uvpzGd5pu',
        }).as('defaultData')
    })
})

Then('the download request is sent with the right parameters', () => {
    cy.window().then(win => {
        expect(win.assign).to.be.calledOnce

        const call = win.assign.getCall(0)
        const url = call.args[0]

        cy.getComparisonData(url).then(
            ({ actual, expected: allExpected, allData }) => {
                const format = allExpected.format.replace('.', '')
                const {
                    inclusion,
                    programStages,
                    compression,
                    ...expected
                } = allExpected
                const extension = compression !== 'none' ? compression : ''
                const attachment = `events.${format}${extension}`

                /**
                 * The Event page has some (WTF) customizations.
                 * These are handled here:
                 */
                const updatedExpected = {
                    ...expected,
                    links: 'false',
                    skipPaging: 'true',
                    ouMode: inclusion.toUpperCase(),
                    programStage: programStages,
                    attachment,
                    format,
                }

                if (!updatedExpected.programStage) {
                    delete updatedExpected.programStage
                }

                expect(actual).to.deep.equal(updatedExpected)
            }
        )
    })
})
