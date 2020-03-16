const switchInputs = [
    'async',
    'children',
    'includeDeleted',
    'preheatCache',
    'skipAudit',
    'skipExistingCheck',
    'skipSharing',
    'skipValidation',
]

const radioInputs = [
    'atomicMode',
    'compression',
    'flushMode',
    'format',
    'identifier',
    'importReportMode',
    'importStrategy',
    'inclusion',
    'inclusionStrategy',
    'mergeMode',
    'preheatMode',
    'program',
    'sharing',
    'strategy',
]

const ignoreInputs = ['dryRun', 'importMode']

const selectInputs = [
    'dataElementIdScheme',
    'eventIdScheme',
    'orgUnitIdScheme',
    'idScheme',
    'programStages',
    'objectType',
    'objectList',
]

const dateInputs = ['startDate', 'endDate']

const nameToDataTest = name => {
    switch (name) {
        case 'async':
            return 'isAsync'

        case 'children':
            return 'includeChildren'

        case 'dataElementIdScheme':
            return 'input-data-element-id-scheme'

        case 'eventIdScheme':
            return 'input-event-id-scheme'

        case 'orgUnitIdScheme':
            return 'input-org-unit-id-scheme'

        case 'idScheme':
            return 'input-id-scheme'

        case 'program':
            return 'programPicker'

        case 'programStages':
            return 'input-program-stage-select'

        case 'objectType':
            return 'input-object-type'

        case 'objectList':
            return 'input-object-select'

        default:
            return name
    }
}

/**
 * @param {string} name
 * @param {string} value
 */
const selectFormInput = ({ name, value }) => {
    if (switchInputs.includes(name)) {
        const dataTest = nameToDataTest(name)
        cy.selectSwitch(dataTest, value)
    } else if (radioInputs.includes(name)) {
        const dataTest = nameToDataTest(name)
        cy.selectRadio(dataTest, value)
    } else if (selectInputs.includes(name)) {
        const dataTest = nameToDataTest(name)
        cy.selectSelect(dataTest, value)
    } else if (dateInputs.includes(name)) {
        cy.selectDate(name, value)
    } else if (ignoreInputs.includes(name)) {
    } else {
        throw new Error(`Step needs to handle "${name}"`)
    }
}

Cypress.Commands.add('selectFormInput', selectFormInput)
