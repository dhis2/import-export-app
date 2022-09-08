import '../common/settingFormValues'
import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps'

const schemasApi = /\/schemas\?fields=metadata,collectionName,displayName,klass/
const dataApi = /\/metadata\.(json|csv)(\.(zip|gzip))?/

Before(() => {
    cy.server()
        .stubWithFixture({
            url: schemasApi,
            fixture: 'schemas',
        })
        .as('schemasXHR')
})

Given('the user is on the meta data export page', () => {
    cy.visitPage('export', 'Metadata')
})

Given('all schemas have been selected', () => {
    cy.get(`[data-test="input-schemas-select-all"]`).click()

    cy.get('@changedData').then((changedData) => {
        cy.get('[name^="schemas."]').then(($inputs) => {
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
    cy.get(`[data-test="input-schemas-select-none"]`).click()

    cy.get('@changedData').then((changedData) => {
        cy.get('[name^="schemas."]').then(($inputs) => {
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
    cy.get('@changedData').then((changedData) => {
        cy.wrap({ ...changedData, categoryOptions: 'true' }).as('changedData')
    })
})

When('the export form is submitted', () => {
    cy.window().then((win) => {
        const locationAssignStub = cy.stub().as('locationAssign')
        win.locationAssign = locationAssignStub
        cy.get('[data-test="input-export-submit"]').click()
    })
})

Then('the download request is not sent', () => {
    cy.window().then((win) => {
        cy.get('@locationAssign').then((locationAssignStub) => {
            expect(locationAssignStub).not.to.be.called
        })
    })
})

Then('the download request is sent with the right parameters', () => {
    cy.window().then((win) => {
        cy.get('@locationAssign').then((locationAssignStub) => {
            expect(locationAssignStub).to.be.calledOnce
            const call = locationAssignStub.getCall(0)
            const url = call.args[0]

            cy.getComparisonData(url).then(
                ({ actual, expected: allExpected }) => {
                    const { format, compression, ...expected } = allExpected
                    expect(actual).to.deep.equal({
                        ...expected,
                        download: 'true',
                    })
                }
            )
        })
    })
})
