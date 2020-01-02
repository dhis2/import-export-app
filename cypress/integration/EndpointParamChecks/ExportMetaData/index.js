import '../common/settingFormValues'
import { Before, Given } from 'cypress-cucumber-preprocessor/steps'

const schemasApi = /api\/schemas.json\?fields=metadata,collectionName,displayName,klass/
const dataApi = /api\/metadata\.(json|xml|csv)(\.(zip|gzip))?/

Before(() => {
    cy.server()
        .stubWithFixture({
            url: schemasApi,
            fixture: 'schemas',
        })
        .as('schemasXHR')
})

Given('the user is on the meta data export page', () => {
    cy.visitPage('export', 'metadata')
})

Given('all schemas have been selected', () => {
    cy.get('[class*="Schemas_selectAllButton"]').click()

    cy.get('@changedData').then(changedData => {
        cy.get('[name^="schemas."]').then($inputs => {
            const updates = $inputs.toArray().reduce((curUpdates, input) => {
                const $input = Cypress.$(input)
                const name = $input.attr('name')
                const actualName = name.replace('schemas.', '')
                return {
                    ...curUpdates,
                    [actualName]: 'true',
                }
            }, changedData)

            cy.wrap(updates).as('changedData')
        })
    })
})

Given('the schemas are all deselected', () => {
    cy.get('[class*="Schemas_selectAllButton"] + button').click()

    cy.get('@changedData').then(changedData => {
        cy.get('[name^="schemas."]').then($inputs => {
            const updates = $inputs.toArray().reduce(
                (curUpdates, input) => {
                    const $input = Cypress.$(input)
                    const name = $input.attr('name')
                    const actualName = name.replace('schemas.', '')

                    delete curUpdates[actualName]
                    return curUpdates
                },
                { ...changedData }
            )

            cy.wrap(updates).as('changedData')
        })
    })
})

Given('the category option schema is selected', () => {
    cy.toggleCheckbox('schemas.categoryOptions')
    cy.get('@changedData').then(changedData => {
        cy.wrap({ ...changedData, categoryOptions: 'true' }).as('changedData')
    })
})

Then('the download request is sent with the right parameters', () => {
    cy.window().then(win => {
        expect(win.assign).to.be.calledOnce

        const call = win.assign.getCall(0)
        const url = call.args[0]

        cy.getComparisonData(url).then(({ actual, expected: allExpected }) => {
            const { format, compression, ...expected } = allExpected
            expect(actual).to.deep.equal({
                ...expected,
                download: 'true',
            })
        })
    })
})
