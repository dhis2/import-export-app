import '../common/settingFormValues'
import { Before, Given } from 'cypress-cucumber-preprocessor/steps'

//const schemasApi = /api\/\d+\/schemas.json\?fields=metadata,collectionName,displayName,klass/
const schemasApi = /api\/\d+\/schemas.json$/

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
    cy.wait('@schemasXHR')
})

Given('all schemas have been selected', () => {
    cy.get('[data-test="input-schemas"] span:contains("Select All")').click()

    cy.get('@changedData').then(changedData => {
        cy.get('[data-test="input-schemas"] input[type="checkbox"]').then(
            $inputs => {
                const updates = $inputs
                    .toArray()
                    .reduce((curUpdates, input) => {
                        const $input = Cypress.$(input)
                        const name = $input.attr('value')

                        return {
                            ...curUpdates,
                            [name]: 'true',
                        }
                    }, changedData)

                cy.wrap(updates).as('changedData')
            }
        )
    })
})

Given('the schemas are all deselected', () => {
    cy.get('[data-test="input-schemas"] span:contains("Select None")').click()

    cy.get('@changedData').then(changedData => {
        cy.get('[data-test="input-schemas"] input[type="checkbox"]').then(
            $inputs => {
                const updates = $inputs.toArray().reduce(
                    (curUpdates, input) => {
                        const $input = Cypress.$(input)
                        const name = $input.attr('value')

                        // don't mutate "curUpdates"
                        // Makes it harder to debug
                        const next = { ...curUpdates }
                        delete next[name]

                        return next
                    },
                    { ...changedData }
                )

                cy.wrap(updates).as('changedData')
            }
        )
    })
})

Given('the category option schema is selected', () => {
    cy.toggleCheckbox('categoryOptions', true)
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
            const { compression, format, sharing, ...rest } = allExpected
            const expected = {
                ...rest,
                // see "src/helpder/download.js::getDownloadUrl"
                // for an explanation why skipSharing is the way it is
                skipSharing: (sharing !== 'true').toString(),
                download: 'true',
            }

            expect(actual).to.deep.equal(expected)
        })
    })
})
