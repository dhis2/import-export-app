import i18n from '@dhis2/d2-i18n'
import {
    CTX_DEFAULT,
    CTX_MORE_OPTIONS,
    CTX_CSV_OPTION,
    TYPE_FILE,
    TYPE_DATE,
    TYPE_DATASET_PICKER,
    TYPE_SELECT,
    TYPE_ORG_UNIT,
    TYPE_ORG_UNIT_SINGLE_SELECT,
    TYPE_MORE_OPTIONS,
    TYPE_RADIO,
    TYPE_SCHEMAS,
} from '../components/Form/constants'

// eslint-disable-next-line max-params
function getField({
    name,
    label,
    type,
    context = CTX_DEFAULT,
    required = false,
    attributes = {},
}) {
    return {
        context,
        type,
        name,
        label,
        required,
        attributes,
    }
}

const fields = {
    async: getField({
        name: 'async',
        label: i18n.t('Async'),
        type: TYPE_RADIO,
        context: CTX_MORE_OPTIONS,
        attributes: { dataTest: 'input-async' },
    }),
    atomicMode: getField({
        name: 'atomicMode',
        label: i18n.t('Atomic Mode'),
        type: TYPE_RADIO,
        attributes: { dataTest: 'input-atomic-mode' },
    }),
    categoryOptionComboIdScheme: getField({
        name: 'categoryOptionComboIdScheme',
        label: i18n.t('Category ID scheme'),
        type: TYPE_SELECT,
        context: CTX_MORE_OPTIONS,
        attributes: { dataTest: 'input-category-option-combo-id-scheme' },
    }),
    children: getField({
        name: 'children',
        label: i18n.t('Children'),
        type: TYPE_RADIO,
        attributes: { dataTest: 'input-children' },
    }),
    classKey: getField({
        name: 'classKey',
        label: i18n.t('Object type'),
        type: TYPE_SELECT,
        context: CTX_CSV_OPTION,
        attributes: { dataTest: 'input-children' },
    }),
    compression: getField({
        name: 'compression',
        label: i18n.t('Compression'),
        type: TYPE_RADIO,
        attributes: { dataTest: 'input-compression' },
    }),
    dataElementIdScheme: getField({
        name: 'dataElementIdScheme',
        label: i18n.t('Data element ID scheme'),
        type: TYPE_SELECT,
        context: CTX_MORE_OPTIONS,
        attributes: { dataTest: 'input-data-element-id-scheme' },
    }),
    dryRun: getField({
        name: 'dryRun',
        label: i18n.t('Dry run'),
        type: TYPE_RADIO,
        attributes: { dataTest: 'input-dry-run' },
    }),
    endDate: getField({
        name: 'endDate',
        label: i18n.t('End date'),
        type: TYPE_DATE,
        attributes: { dataTest: 'input-end-date' },
    }),
    eventIdScheme: getField({
        name: 'eventIdScheme',
        label: i18n.t('Event ID Scheme'),
        type: TYPE_RADIO,
        attributes: { dataTest: 'input-event-id-scheme' },
    }),
    firstRowIsHeader: getField({
        name: 'firstRowIsHeader',
        label: i18n.t('First row is header'),
        type: TYPE_RADIO,
        context: CTX_CSV_OPTION,
        attributes: { dataTest: 'input-first-row-is-header' },
    }),
    flushMode: getField({
        name: 'flushMode',
        label: i18n.t('Flush Mode'),
        type: TYPE_RADIO,
        context: CTX_MORE_OPTIONS,
        attributes: { dataTest: 'input-flush-mode' },
    }),
    format: getField({
        name: 'format',
        label: i18n.t('Format'),
        type: TYPE_RADIO,
        attributes: { dataTest: 'input-format' },
    }),
    idScheme: getField({
        name: 'idScheme',
        label: i18n.t('ID scheme'),
        type: TYPE_SELECT,
        context: CTX_MORE_OPTIONS,
        attributes: { dataTest: 'input-id-scheme' },
    }),
    identifier: getField({
        name: 'identifier',
        label: i18n.t('Identifier'),
        type: TYPE_RADIO,
        attributes: { dataTest: 'input-identifier' },
    }),
    importMode: getField({
        name: 'importMode',
        label: i18n.t('Dry run'),
        type: TYPE_RADIO,
        attributes: { dataTest: 'input-import-mode' },
    }),
    importReportMode: getField({
        name: 'importReportMode',
        label: i18n.t('Report Mode'),
        type: TYPE_RADIO,
        attributes: { dataTest: 'input-import-report-mode' },
    }),
    importStrategy: getField({
        name: 'importStrategy',
        label: i18n.t('Import Strategy'),
        type: TYPE_RADIO,
        attributes: { dataTest: 'input-import-strategy' },
    }),
    includeDeleted: getField({
        name: 'includeDeleted',
        label: i18n.t('Include deleted'),
        type: TYPE_RADIO,
        context: CTX_MORE_OPTIONS,
        attributes: { dataTest: 'input-include-delete' },
    }),
    inclusion: getField({
        name: 'inclusion',
        label: i18n.t('Inclusion'),
        type: TYPE_RADIO,
        context: CTX_MORE_OPTIONS,
        attributes: { dataTest: 'input-inclusion' },
    }),
    inclusionStrategy: getField({
        name: 'inclusionStrategy',
        label: i18n.t('Inclusion Strategy'),
        type: TYPE_RADIO,
        context: CTX_MORE_OPTIONS,
        attributes: { dataTest: 'input-inclusion-strategy' },
    }),
    mergeMode: getField({
        name: 'mergeMode',
        label: i18n.t('Merge Mode'),
        type: TYPE_RADIO,
        attributes: { dataTest: 'input-merge-mode' },
    }),
    objectList: getField({
        name: 'objectList',
        label: i18n.t('Object'),
        type: TYPE_SELECT,
        attributes: { dataTest: 'input-object-list' },
    }),
    objectType: getField({
        name: 'objectType',
        label: i18n.t('Object type'),
        type: TYPE_SELECT,
        attributes: { dataTest: 'input-object-type' },
    }),
    orgUnit: getField({
        name: 'orgUnit',
        label: i18n.t('Organisation unit'),
        type: TYPE_ORG_UNIT,
        attributes: { dataTest: 'input-org-unit' },
    }),
    orgUnitIdScheme: getField({
        name: 'orgUnitIdScheme',
        label: i18n.t('Org unit ID scheme'),
        type: TYPE_SELECT,
        context: CTX_MORE_OPTIONS,
        attributes: { dataTest: 'input-org-unit-id-scheme' },
    }),
    orgUnit_SingleSelect: getField({
        name: 'orgUnit',
        label: i18n.t('Organisation unit'),
        type: TYPE_ORG_UNIT_SINGLE_SELECT,
        attributes: { dataTest: 'input-org-unit' },
    }),
    preheatCache: getField({
        name: 'preheatCache',
        label: i18n.t('Preheat cache'),
        type: TYPE_RADIO,
        attributes: { dataTest: 'input-preheat-cache' },
    }),
    preheatMode: getField({
        name: 'preheatMode',
        label: i18n.t('Preheat Mode'),
        type: TYPE_RADIO,
        attributes: { dataTest: 'input-preheat-mode' },
    }),
    programStages: getField({
        name: 'programStages',
        label: i18n.t('Program Stages'),
        type: TYPE_SELECT,
        attributes: { dataTest: 'input-program-stages' },
    }),
    programs: getField({
        name: 'programs',
        label: i18n.t('Programs'),
        type: TYPE_SELECT,
        attributes: { dataTest: 'input-programs' },
    }),
    schemas: getField({
        name: 'schemas',
        label: i18n.t('Schemas'),
        type: TYPE_SCHEMAS,
        attributes: { dataTest: 'input-schemas' },
    }),
    selectedDataSets: getField({
        name: 'selectedDataSets',
        label: i18n.t('Data Sets'),
        type: TYPE_DATASET_PICKER,
        attributes: { dataTest: 'input-data-sets' },
    }),
    sharing: getField({
        name: 'sharing',
        label: i18n.t('Sharing'),
        type: TYPE_RADIO,
        attributes: { dataTest: 'input-sharing' },
    }),
    skipExistingCheck: getField({
        name: 'skipExistingCheck',
        label: i18n.t('Existing record check'),
        type: TYPE_RADIO,
        context: CTX_MORE_OPTIONS,
        attributes: { dataTest: 'input-skip-existing-check' },
    }),
    skipSharing: getField({
        name: 'skipSharing',
        label: i18n.t('Skip Sharing'),
        type: TYPE_RADIO,
        context: CTX_MORE_OPTIONS,
        attributes: { dataTest: 'input-skip-sharing' },
    }),
    skipValidation: getField({
        name: 'skipValidation',
        label: i18n.t('Skip Validation'),
        type: TYPE_RADIO,
        context: CTX_MORE_OPTIONS,
        attributes: { dataTest: 'input-skip-validation' },
    }),
    startDate: getField({
        name: 'startDate',
        label: i18n.t('Start date'),
        type: TYPE_DATE,
        attributes: { dataTest: 'input-start-date' },
    }),
    strategy: getField({
        name: 'strategy',
        label: i18n.t('Strategy'),
        type: TYPE_RADIO,
        attributes: { dataTest: 'input-strategy' },
    }),
    upload: getField({
        name: 'upload',
        label: null,
        type: TYPE_FILE,
        required: true,
        attributes: { dataTest: 'input-upload' },
    }),
}

export function getFormField(name, options = {}) {
    if (typeof fields[name] === 'undefined') {
        console.error('field', name, 'not found in fields')
    }

    return {
        ...fields[name],
        ...options,
    }
}

export function getFormFields(list) {
    return list.map(i => getFormField(i))
}

export function getFormFieldMoreOptions() {
    return {
        context: CTX_DEFAULT,
        type: TYPE_MORE_OPTIONS,
    }
}
