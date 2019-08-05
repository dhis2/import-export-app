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
function getField(name, label, type, context = CTX_DEFAULT, required = false) {
    return {
        context,
        type,
        name,
        label,
        required,
    }
}

const fields = {
    async: getField('async', i18n.t('Async'), TYPE_RADIO, CTX_MORE_OPTIONS),
    atomicMode: getField('atomicMode', i18n.t('Atomic Mode'), TYPE_RADIO),
    categoryOptionComboIdScheme: getField(
        'categoryOptionComboIdScheme',
        i18n.t('Category ID scheme'),
        TYPE_RADIO,
        CTX_MORE_OPTIONS
    ),
    children: getField('children', i18n.t('Children'), TYPE_RADIO),
    classKey: getField(
        'classKey',
        i18n.t('Object type'),
        TYPE_SELECT,
        CTX_CSV_OPTION
    ),
    compression: getField('compression', i18n.t('Compression'), TYPE_RADIO),
    dataElementIdScheme: getField(
        'dataElementIdScheme',
        i18n.t('Data element ID scheme'),
        TYPE_RADIO,
        CTX_MORE_OPTIONS
    ),
    dryRun: getField('dryRun', i18n.t('Dry run'), TYPE_RADIO),
    endDate: getField('endDate', i18n.t('End date'), TYPE_DATE),
    eventIdScheme: getField(
        'eventIdScheme',
        i18n.t('Event ID Scheme'),
        TYPE_RADIO
    ),
    firstRowIsHeader: getField(
        'firstRowIsHeader',
        i18n.t('First row is header'),
        TYPE_RADIO,
        CTX_CSV_OPTION
    ),
    flushMode: getField(
        'flushMode',
        i18n.t('Flush Mode'),
        TYPE_RADIO,
        CTX_MORE_OPTIONS
    ),
    format: getField('format', i18n.t('Format'), TYPE_RADIO),
    idScheme: getField('idScheme', i18n.t('ID scheme'), TYPE_RADIO),
    identifier: getField('identifier', i18n.t('Identifier'), TYPE_RADIO),
    importMode: getField('importMode', i18n.t('Dry run'), TYPE_RADIO),
    importReportMode: getField(
        'importReportMode',
        i18n.t('Report Mode'),
        TYPE_RADIO
    ),
    importStrategy: getField(
        'importStrategy',
        i18n.t('Import Strategy'),
        TYPE_RADIO
    ),
    includeDeleted: getField(
        'includeDeleted',
        i18n.t('Include deleted'),
        TYPE_RADIO,
        CTX_MORE_OPTIONS
    ),
    inclusion: getField(
        'inclusion',
        i18n.t('Inclusion'),
        TYPE_RADIO,
        CTX_MORE_OPTIONS
    ),
    inclusionStrategy: getField(
        'inclusionStrategy',
        i18n.t('Inclusion Strategy'),
        TYPE_RADIO,
        CTX_MORE_OPTIONS
    ),
    mergeMode: getField('mergeMode', i18n.t('Merge Mode'), TYPE_RADIO),
    objectList: getField('objectList', i18n.t('Object'), TYPE_SELECT),
    objectType: getField('objectType', i18n.t('Object type'), TYPE_SELECT),
    orgUnit: getField('orgUnit', i18n.t('Organisation unit'), TYPE_ORG_UNIT),
    orgUnitIdScheme: getField(
        'orgUnitIdScheme',
        i18n.t('Org unit ID scheme'),
        TYPE_RADIO,
        CTX_MORE_OPTIONS
    ),
    orgUnit_SingleSelect: getField(
        'orgUnit',
        i18n.t('Organisation unit'),
        TYPE_ORG_UNIT_SINGLE_SELECT
    ),
    preheatCache: getField('preheatCache', i18n.t('Preheat cache'), TYPE_RADIO),
    preheatMode: getField('preheatMode', i18n.t('Preheat Mode'), TYPE_RADIO),
    programStages: getField(
        'programStages',
        i18n.t('Program Stages'),
        TYPE_SELECT
    ),
    programs: getField('programs', i18n.t('Programs'), TYPE_SELECT),
    schemas: getField('schemas', i18n.t('Schemas'), TYPE_SCHEMAS),
    selectedDataSets: getField(
        'selectedDataSets',
        i18n.t('Data Sets'),
        TYPE_DATASET_PICKER
    ),
    sharing: getField('sharing', i18n.t('Sharing'), TYPE_RADIO),
    skipExistingCheck: getField(
        'skipExistingCheck',
        i18n.t('Existing record check'),
        TYPE_RADIO,
        CTX_MORE_OPTIONS
    ),
    skipSharing: getField(
        'skipSharing',
        i18n.t('Skip Sharing'),
        TYPE_RADIO,
        CTX_MORE_OPTIONS
    ),
    skipValidation: getField(
        'skipValidation',
        i18n.t('Skip Validation'),
        TYPE_RADIO,
        CTX_MORE_OPTIONS
    ),
    startDate: getField('startDate', i18n.t('Start date'), TYPE_DATE),
    strategy: getField('strategy', i18n.t('Strategy'), TYPE_RADIO),
    upload: getField('upload', null, TYPE_FILE, undefined, true),
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
