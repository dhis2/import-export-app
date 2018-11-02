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
    schemas: {
        context: CTX_DEFAULT,
        type: TYPE_SCHEMAS,
        name: 'schemas',
        label: i18n.t('Schemas'),
    },
    format: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'format',
        label: i18n.t('Format'),
    },
    compression: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'compression',
        label: i18n.t('Compression'),
    },
    sharing: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'sharing',
        label: i18n.t('Sharing'),
    },
    startDate: {
        context: CTX_DEFAULT,
        type: TYPE_DATE,
        name: 'startDate',
        label: i18n.t('Start date'),
    },
    endDate: {
        context: CTX_DEFAULT,
        type: TYPE_DATE,
        name: 'endDate',
        label: i18n.t('End date'),
    },
    idScheme: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'idScheme',
        label: i18n.t('ID scheme'),
    },
    includeDeleted: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'includeDeleted',
        label: i18n.t('Include deleted'),
    },
    orgUnit: {
        context: CTX_DEFAULT,
        type: TYPE_ORG_UNIT,
        name: 'orgUnit',
        label: i18n.t('Organisation unit'),
    },
    orgUnit_SingleSelect: {
        context: CTX_DEFAULT,
        type: TYPE_ORG_UNIT_SINGLE_SELECT,
        name: 'orgUnit',
        label: i18n.t('Organisation unit'),
    },
    selectedDataSets: {
        context: CTX_DEFAULT,
        type: TYPE_DATASET_PICKER,
        name: 'selectedDataSets',
        label: i18n.t('Data Sets'),
    },
    objectType: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'objectType',
        label: i18n.t('Object type'),
    },
    objectList: {
        context: CTX_DEFAULT,
        type: TYPE_SELECT,
        name: 'objectList',
        label: i18n.t('Object'),
    },
    programs: {
        context: CTX_DEFAULT,
        type: TYPE_SELECT,
        name: 'programs',
        label: i18n.t('Programs'),
    },
    programStages: {
        context: CTX_DEFAULT,
        type: TYPE_SELECT,
        name: 'programStages',
        label: i18n.t('Program Stages'),
    },
    inclusion: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'inclusion',
        label: i18n.t('Inclusion'),
    },
    exportFormat: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'exportFormat',
        label: i18n.t('Format'),
    },
    dataElementIdScheme: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'dataElementIdScheme',
        label: i18n.t('Data element ID scheme'),
    },
    orgUnitIdScheme: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'orgUnitIdScheme',
        label: i18n.t('Org unit ID scheme'),
    },
    categoryOptionComboIdScheme: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'categoryOptionComboIdScheme',
        label: i18n.t('Category ID scheme'),
    },
    payloadFormat: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'payloadFormat',
        label: i18n.t('Format'),
    },
    dryRun: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'dryRun',
        label: i18n.t('Dry run'),
    },
    importFormat: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'importFormat',
        label: i18n.t('Format'),
    },
    upload: {
        context: CTX_DEFAULT,
        type: TYPE_FILE,
        name: 'upload',
        label: null,
    },
    eventIdScheme: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'eventIdScheme',
        label: i18n.t('Event ID Scheme'),
    },
    strategy: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'strategy',
        label: i18n.t('Strategy'),
    },
    preheatCache: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'preheatCache',
        label: i18n.t('Preheat cache'),
    },
    skipExistingCheck: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'skipExistingCheck',
        label: i18n.t('Existing record check'),
    },
    flushMode: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'flushMode',
        label: i18n.t('Flush Mode'),
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
    async: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'async',
        label: i18n.t('Async'),
    },
    inclusionStrategy: {
        context: CTX_MORE_OPTIONS,
        type: TYPE_RADIO,
        name: 'inclusionStrategy',
        label: i18n.t('Inclusion Strategy'),
    },
    classKey: {
        context: CTX_CSV_OPTION,
        type: TYPE_SELECT,
        name: 'classKey',
        label: i18n.t('Object type'),
    },
    importMode: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'importMode',
        label: i18n.t('Import Mode'),
    },
    identifier: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'identifier',
        label: i18n.t('Identifier'),
    },
    importReportMode: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'importReportMode',
        label: i18n.t('Report Mode'),
    },
    preheatMode: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'preheatMode',
        label: i18n.t('Preheat Mode'),
    },
    importStrategy: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'importStrategy',
        label: i18n.t('Import Strategy'),
    },
    atomicMode: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'atomicMode',
        label: i18n.t('Atomic Mode'),
    },
    mergeMode: {
        context: CTX_DEFAULT,
        type: TYPE_RADIO,
        name: 'mergeMode',
        label: i18n.t('Merge Mode'),
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
