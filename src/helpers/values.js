import i18n from '@dhis2/d2-i18n'
import { CTX_DEFAULT } from '../components/Form'
import { today, endDateDefault } from '../helpers'

function getValue(value, label) {
    return {
        value,
        label,
    }
}

function getValues(list) {
    return list.map(([value, label]) => getValue(value, label))
}

export function isValueNil(val) {
    return val == null || val === ''
}

const supportedFormats = ['adx', 'csv', 'json', 'pdf', 'xml']

function getFormat(selected, list) {
    const extensions = {}
    supportedFormats.forEach(ext => {
        extensions[ext] = getValue(`.${ext}`, ext.toUpperCase())
    })

    const values = []
    list.split(',').forEach(k => values.push(extensions[k]))

    return {
        selected,
        values,
    }
}

// eslint-disable-next-line max-params
function getBoolean(
    selected,
    labelTrue = i18n.t('Yes'),
    labelFalse = i18n.t('No'),
    reverseOrder = false
) {
    return {
        selected,
        values: reverseOrder
            ? getValues([
                  ['false', labelFalse],
                  ['true', labelTrue],
              ])
            : getValues([
                  ['true', labelTrue],
                  ['false', labelFalse],
              ]),
    }
}

function getScheme(selected) {
    return {
        selected,
        values: getValues([
            ['UID', i18n.t('UID')],
            ['CODE', i18n.t('Code')],
        ]),
    }
}

const calculated = {
    format: getFormat,
}

export const values = {
    upload: {
        selected: null,
    },

    dryRun: getBoolean('false'),
    firstRowIsHeader: getBoolean('false'),

    idScheme: getScheme('UID'),
    eventIdScheme: getScheme('UID'),

    orgUnitIdScheme: {
        selected: 'UID',
        values: getValues([
            ['UID', i18n.t('UID')],
            ['CODE', i18n.t('Code')],
            ['NAME', i18n.t('Name')],
        ]),
    },

    children: getBoolean(
        'true',
        i18n.t('Include descendants of organisation unit'),
        i18n.t('Selected organisation unit')
    ),

    preheatCache: getBoolean('false', i18n.t('Yes (faster for large imports)')),

    strategy: {
        selected: 'NEW_AND_UPDATES',
        values: getValues([
            ['NEW_AND_UPDATES', i18n.t('New and Updates')],
            ['NEW', i18n.t('New only')],
            ['UPDATES', i18n.t('Updates only')],
            ['DELETE', i18n.t('Delete')],
        ]),
    },

    skipExistingCheck: getBoolean(
        'false',
        i18n.t('Skip check (fast)'),
        i18n.t('Check (safe, recommended)')
    ),

    dataElementIdScheme: {
        selected: 'UID',
        values: getValues([
            ['UID', i18n.t('UID')],
            ['CODE', i18n.t('Code')],
            ['NAME', i18n.t('Name')],
        ]),
    },

    classKey: {
        selected: '',
        values: [],
    },

    _context: CTX_DEFAULT,

    importMode: {
        selected: 'COMMIT',
        values: getValues([
            ['VALIDATE', i18n.t('Yes')],
            ['COMMIT', i18n.t('No')],
        ]),
    },

    identifier: {
        selected: 'UID',
        values: getValues([
            ['UID', i18n.t('UID')],
            ['CODE', i18n.t('Code')],
            ['AUTO', i18n.t('AUTO')],
        ]),
    },

    importReportMode: {
        selected: 'ERRORS',
        values: getValues([
            ['ERRORS', i18n.t('Errors')],
            ['FULL', i18n.t('Full')],
            ['DEBUG', i18n.t('Debug')],
        ]),
    },

    preheatMode: {
        selected: 'REFERENCE',
        values: getValues([
            ['REFERENCE', i18n.t('Reference')],
            ['ALL', i18n.t('All')],
            ['NONE', i18n.t('None')],
        ]),
    },

    importStrategy: {
        selected: 'CREATE_AND_UPDATE',
        values: getValues([
            ['CREATE_AND_UPDATE', i18n.t('Create and Update')],
            ['CREATE', i18n.t('Create')],
            ['UPDATE', i18n.t('Update')],
            ['DELETE', i18n.t('Delete')],
        ]),
    },

    atomicMode: {
        selected: 'ALL',
        values: getValues([
            ['ALL', i18n.t('All')],
            ['NONE', i18n.t('None')],
        ]),
    },

    mergeMode: {
        selected: 'MERGE',
        values: getValues([
            ['MERGE', i18n.t('Merge')],
            ['REPLACE', i18n.t('Replace')],
        ]),
    },

    flushMode: {
        selected: 'AUTO',
        values: getValues([
            ['AUTO', i18n.t('Auto')],
            ['OBJECT', i18n.t('Object')],
        ]),
    },

    sharing: getBoolean(
        'true',
        i18n.t('With sharing'),
        i18n.t('Without sharing')
    ),

    skipSharing: getBoolean('false'),

    skipValidation: getBoolean('false'),

    async: getBoolean('true'),

    inclusionStrategy: {
        selected: 'NON_NULL',
        values: getValues([
            ['NON_NULL', i18n.t('Non Null')],
            ['ALWAYS', i18n.t('Always')],
            ['NON_EMPTY', i18n.t('Non Empty')],
        ]),
    },

    inclusion: {
        selected: 'selected',
        values: getValues([
            ['selected', i18n.t('Selected organisation unit')],
            ['children', i18n.t('Include children of organisation unit')],
            ['descendants', i18n.t('Include descendants of organisation unit')],
        ]),
    },

    orgUnit: {
        selected: [],
        value: null,
    },

    selectedDataSets: {
        selected: [],
        value: null,
    },

    startDate: {
        selected: endDateDefault(),
    },

    endDate: {
        selected: today(),
    },

    compression: {
        selected: '.zip',
        values: getValues([
            ['.zip', i18n.t('Zip')],
            ['.gz', i18n.t('Gzip')],
            ['none', i18n.t('Uncompressed')],
        ]),
    },

    includeDeleted: getBoolean('false'),

    categoryOptionComboIdScheme: getScheme('UID'),

    schemas: {
        selected: [],
    },

    objectType: {
        selected: 'dataSets',
        values: getValues([
            ['dataSets', i18n.t('Data sets')],
            ['programs', i18n.t('Programs')],
            ['categoryCombos', i18n.t('Category combination')],
            ['dashboards', i18n.t('Dashboard')],
            ['dataElementGroups', i18n.t('Data element groups')],
            ['optionSets', i18n.t('Option sets')],
        ]),
    },

    objectList: {
        selected: '',
        values: [],
    },

    programs: {
        selected: '',
        values: [],
    },

    programStages: {
        selected: -1,
        values: getValues([[-1, i18n.t('[ All program stages]')]]),
    },
}

export function getFormValues(list) {
    const o = {
        _meta: {
            submitted: false,
            valid: false,
            processing: false,
            error: null,
        },
    }

    list.forEach(k => {
        if (typeof values[k] === 'undefined' && !k.includes(':')) {
            console.error('value', k, 'not found in values')
        }

        if (k.includes(':')) {
            const [name, selected, list] = k.split(':')
            o[name] = calculated[name](selected, list)
        } else {
            o[k] = values[k]
        }
    })

    return o
}

export const EXCLUDE_SCHEMAS = new Set([
    'analyticsTableHooks',
    'charts',
    'constants',
    'dataElementDimensions',
    'dataEntryForms',
    'dataSetNotificationTemplates',
    'dataStores',
    'documents',
    'eventCharts',
    'eventReports',
    'icons',
    'jobConfigurations',
    'messageConversations',
    'metadataVersions',
    'minMaxDataElements',
    'oAuth2Clients',
    'programDataElements',
    'programNotificationTemplates',
    'pushAnalysis',
    'reportTables',
    'reportingRates',
    'reports',
    'sections',
    'smsCommands',
    'sqlViews',
    'trackedEntityInstanceFilters',
    'validationNotificationTemplates',
])
