import { nameToDataTest } from './helpers/nameToDataTest'

const transferInputs = ['assignedUser']

const switchInputs = [
    'assignedUserModeFilter',
    'async',
    'children',
    'includeAllAttributes',
    'includeDeleted',
    'preheatCache',
    'skipAudit',
    'skipExistingCheck',
    'skipSharing',
    'skipValidation',
]

const radioInputs = [
    'assignedUserMode',
    'atomicMode',
    'compression',
    'flushMode',
    'followUpStatus',
    'format',
    'identifier',
    'importReportMode',
    'importStrategy',
    'inclusion',
    'inclusionStrategy',
    'lastUpdatedFilter',
    'mergeMode',
    'orgUnitMode',
    'preheatMode',
    'programStatus',
    'sharing',
    'strategy',
    'teiTypeFilter',
]

const ignoreInputs = ['dryRun', 'importMode']

const selectInputs = [
    'dataElementIdScheme',
    'orgUnitIdScheme',
    'idScheme',
    'program',
    'programStages',
    'objectType',
    'objectList',
    'trackedEntityType',
]

const dateInputs = [
    'startDate',
    'endDate',
    'programStartDate',
    'programEndDate',
    'lastUpdatedStartDate',
    'lastUpdatedEndDate',
]

const textInputs = ['lastUpdatedDuration']

/**
 * @param {Object} args
 * @param {string} args.name
 * @param {string} args.value
 * @param {string} args.label
 */
const selectFormInput = ({ name, value, label }) => {
    const dataTest = nameToDataTest(name)

    if (transferInputs.includes(name)) {
        cy.selectTransfer(dataTest, value)
        return cy.getValuesOfTransfer(dataTest)
    }

    if (switchInputs.includes(name)) {
        cy.selectSwitch(dataTest, value)
        return cy.wrap(value)
    }

    if (radioInputs.includes(name)) {
        cy.selectRadio(dataTest, value)
        return cy.wrap(value)
    }

    if (selectInputs.includes(name)) {
        cy.selectSelect(dataTest, label)
        return cy.getValueOfSelect(dataTest)
    }

    if (dateInputs.includes(name)) {
        cy.selectDate(name, value)
        return cy.wrap(value)
    }

    if (textInputs.includes(name)) {
        cy.selectText(name, value)
        return cy.wrap(value)
    }

    if (ignoreInputs.includes(name)) {
        return cy.wrap(value)
    }

    throw new Error(`Step needs to handle "${name}"`)
}

Cypress.Commands.add('selectFormInput', selectFormInput)
