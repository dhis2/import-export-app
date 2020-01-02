const radioInputs = [
    'async',
    'atomicMode',
    'children',
    'compression',
    'dryRun',
    'eventIdScheme',
    'flushMode',
    'format',
    'identifier',
    'importMode',
    'importReportMode',
    'importStrategy',
    'includeDeleted',
    'inclusion',
    'inclusionStrategy',
    'mergeMode',
    'preheatCache',
    'preheatMode',
    'sharing',
    'skipAudit',
    'skipExistingCheck',
    'skipSharing',
    'skipValidation',
    'strategy',
]

const selectInputs = [
    'dataElementIdScheme',
    'orgUnitIdScheme',
    'idScheme',
    'programs',
    'programStages',
    'objectType',
    'objectList',
]

const dateInputs = ['startDate', 'endDate']

const nameToDataTest = name => {
    switch (name) {
        case 'dataElementIdScheme':
            return 'input-data-element-id-scheme'

        case 'orgUnitIdScheme':
            return 'input-org-unit-id-scheme'

        case 'idScheme':
            return 'input-id-scheme'

        case 'programs':
            return 'input-programs'

        case 'programStages':
            return 'input-program-stages'

        case 'objectType':
            return 'input-object-type'

        case 'objectList':
            return 'input-object-list'
    }
}

/**
 * @param {string} name
 * @param {string} value
 * @param {label|bool} label
 * Can be a boolean to indicate that the underlying
 * input component is an old component, which will be removed
 * once all pages have been refactored to RFF
 */
const selectFormInput = ({ name, value, label }) => {
    if (radioInputs.includes(name)) {
        cy.selectRadio(name, value, label)
    } else if (selectInputs.includes(name)) {
        const dataTest = nameToDataTest(name)
        cy.selectSelect(dataTest, value, label)
    } else if (dateInputs.includes(name)) {
        cy.selectDate(name, value)
    } else {
        throw new Error(`Step needs to handle "${name} / ${name}"`)
    }
}

Cypress.Commands.add('selectFormInput', selectFormInput)
