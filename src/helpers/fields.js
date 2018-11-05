import i18n from '@dhis2/d2-i18n'
import { CTX_DEFAULT, CTX_MORE_OPTIONS, CTX_CSV_OPTION } from 'components/Form'
import {
    TYPE_FILE,
    TYPE_DATE,
    TYPE_DATASET_PICKER,
    TYPE_SELECT,
    TYPE_ORG_UNIT,
    TYPE_ORG_UNIT_SINGLE_SELECT,
    TYPE_MORE_OPTIONS,
} from 'components/Form'
import { TYPE_RADIO, TYPE_SCHEMAS } from 'components/Form'

const fields = {
    async: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'async',
        label: i18n.t('Async'),
    },
    atomicMode: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'atomicMode',
        label: i18n.t('Atomic Mode'),
    },
    categoryOptionComboIdScheme: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'categoryOptionComboIdScheme',
        label: i18n.t('Category ID scheme'),
    },
    classKey: {
        context: CTX_CSV_OPTION,
        type: TYPE_SELECT,
        name: 'classKey',
        label: i18n.t('Object type'),
    },
    compression: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'compression',
        label: i18n.t('Compression'),
    },
    dataElementIdScheme: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'dataElementIdScheme',
        label: i18n.t('Data element ID scheme'),
    },
    dryRun: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'dryRun',
        label: i18n.t('Dry run'),
    },
    endDate: {
        context: CTX_DEFAULT,
        type: TYPE_DATE,
        name: 'endDate',
        label: i18n.t('End date'),
    },
    eventIdScheme: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'eventIdScheme',
        label: i18n.t('Event ID Scheme'),
    },
    flushMode: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'flushMode',
        label: i18n.t('Flush Mode'),
    },
    format: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'format',
        label: i18n.t('Format'),
    },
    idScheme: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'idScheme',
        label: i18n.t('ID scheme'),
    },
    identifier: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'identifier',
        label: i18n.t('Identifier'),
    },
    importMode: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'importMode',
        label: i18n.t('Import Mode'),
    },
    importReportMode: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'importReportMode',
        label: i18n.t('Report Mode'),
    },
    importStrategy: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'importStrategy',
        label: i18n.t('Import Strategy'),
    },
    includeDeleted: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'includeDeleted',
        label: i18n.t('Include deleted'),
    },
    inclusion: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'inclusion',
        label: i18n.t('Inclusion'),
    },
    inclusionStrategy: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'inclusionStrategy',
        label: i18n.t('Inclusion Strategy'),
    },
    mergeMode: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'mergeMode',
        label: i18n.t('Merge Mode'),
    },
    objectList: {
        context: CTX_DEFAULT,
        type: TYPE_SELECT,
        name: 'objectList',
        label: i18n.t('Object'),
    },
    objectType: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'objectType',
        label: i18n.t('Object type'),
    },
    orgUnit: {
        context: CTX_DEFAULT,
        type: TYPE_ORG_UNIT,
        name: 'orgUnit',
        label: i18n.t('Organisation unit'),
    },
    orgUnitIdScheme: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'orgUnitIdScheme',
        label: i18n.t('Org unit ID scheme'),
    },
    orgUnit_SingleSelect: {
        context: CTX_DEFAULT,
        type: TYPE_ORG_UNIT_SINGLE_SELECT,
        name: 'orgUnit',
        label: i18n.t('Organisation unit'),
    },
    preheatCache: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'preheatCache',
        label: i18n.t('Preheat cache'),
    },
    preheatMode: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'preheatMode',
        label: i18n.t('Preheat Mode'),
    },
    programStages: {
        context: CTX_DEFAULT,
        type: TYPE_SELECT,
        name: 'programStages',
        label: i18n.t('Program Stages'),
    },
    programs: {
        context: CTX_DEFAULT,
        type: TYPE_SELECT,
        name: 'programs',
        label: i18n.t('Programs'),
    },
    schemas: {
        context: CTX_DEFAULT,
        type: TYPE_SCHEMAS,
        name: 'schemas',
        label: i18n.t('Schemas'),
    },
    selectedDataSets: {
        context: CTX_DEFAULT,
        type: TYPE_DATASET_PICKER,
        name: 'selectedDataSets',
        label: i18n.t('Data Sets'),
    },
    sharing: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'sharing',
        label: i18n.t('Sharing'),
    },
    skipExistingCheck: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'skipExistingCheck',
        label: i18n.t('Existing record check'),
    },
    skipSharing: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'skipSharing',
        label: i18n.t('Skip Sharing'),
    },
    skipValidation: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'skipValidation',
        label: i18n.t('Skip Validation'),
    },
    startDate: {
        context: CTX_DEFAULT,
        type: TYPE_DATE,
        name: 'startDate',
        label: i18n.t('Start date'),
    },
    strategy: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'strategy',
        label: i18n.t('Strategy'),
    },
    upload: {
        context: CTX_DEFAULT,
        type: TYPE_FILE,
        name: 'upload',
        label: null,
    },
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

export function getFormFieldMoreOptions() {
    return {
        context: CTX_DEFAULT,
        type: TYPE_MORE_OPTIONS,
    }
}
