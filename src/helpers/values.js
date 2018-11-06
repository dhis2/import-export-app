import i18n from '@dhis2/d2-i18n'
import { CTX_DEFAULT } from 'components/Form'
import { today } from 'helpers'

function getValue(value, label) {
    return {
        value,
        label,
    }
}

function getFormat(selected, list) {
    const extensions = {
        adx: getValue('.adx', i18n.t('ADX')),
        csv: getValue('.csv', i18n.t('CSV')),
        json: getValue('.json', i18n.t('JSON')),
        pdf: getValue('.pdf', i18n.t('PDF')),
        xml: getValue('.xml', i18n.t('XML')),
    }

    const values = []
    list.split(',').forEach(k => values.push(extensions[k]))

    return {
        selected,
        values,
    }
}

function getBoolean(
    selected,
    labelTrue = i18n.t('Yes'),
    labelFalse = i18n.t('No'),
    reverseOrder = false
) {
    return {
        selected,
        values: reverseOrder
            ? [getValue('false', labelFalse), getValue('true', labelTrue)]
            : [getValue('true', labelTrue), getValue('false', labelFalse)],
    }
}

function getScheme(selected) {
    return {
        selected,
        values: [
            getValue('UID', i18n.t('UID')),
            getValue('CODE', i18n.t('Code')),
        ],
    }
}

const calculated = {
    format: getFormat,
}

const values = {
    upload: {
        selected: null,
    },

    dryRun: getBoolean('false'),

    idScheme: getScheme('UID'),
    eventIdScheme: getScheme('UID'),

    orgUnitIdScheme: {
        selected: 'UID',
        values: [
            getValue('UID', i18n.t('UID')),
            getValue('CODE', i18n.t('Code')),
            getValue('NAME', i18n.t('Name')),
            getValue('ATTRIBUTE:UKNKz1H10EE', i18n.t('HR identifier')),
        ],
    },

    children: getBoolean(
        'true',
        i18n.t('Include descendant of organisation unit'),
        i18n.t('Selected organisation unit')
    ),

    preheatCache: getBoolean('false', i18n.t('Yes (faster for large imports)')),

    strategy: {
        selected: 'NEW_AND_UPDATES',
        values: [
            getValue('NEW_AND_UPDATES', i18n.t('New and Updates')),
            getValue('NEW', i18n.t('New only')),
            getValue('UPDATES', i18n.t('Updates only')),
            getValue('DELETE', i18n.t('Delete')),
        ],
    },

    skipExistingCheck: getBoolean(
        'false',
        i18n.t('Skip check (fast)'),
        i18n.t('Check (safe, recommended)')
    ),

    dataElementIdScheme: {
        selected: 'UID',
        values: [
            getValue('UID', i18n.t('UID')),
            getValue('CODE', i18n.t('Code')),
            getValue('NAME', i18n.t('Name')),
        ],
    },

    classKey: {
        selected: '',
        values: [],
    },

    _context: CTX_DEFAULT,

    importMode: {
        selected: 'COMMIT',
        values: [
            getValue('COMMIT', i18n.t('Commit')),
            getValue('VALIDATE', i18n.t('Validate')),
        ],
    },

    identifier: {
        selected: 'UID',
        values: [
            getValue('UID', i18n.t('UID')),
            getValue('CODE', i18n.t('Code')),
            getValue('AUTO', i18n.t('AUTO')),
        ],
    },

    importReportMode: {
        selected: 'ERRORS',
        values: [
            getValue('ERRORS', i18n.t('Errors')),
            getValue('FULL', i18n.t('Full')),
            getValue('DEBUG', i18n.t('Debug')),
        ],
    },

    preheatMode: {
        selected: 'REFERENCE',
        values: [
            getValue('REFERENCE', i18n.t('Reference')),
            getValue('ALL', i18n.t('All')),
            getValue('NONE', i18n.t('None')),
        ],
    },

    importStrategy: {
        selected: 'CREATE_AND_UPDATE',
        values: [
            getValue('CREATE_AND_UPDATE', i18n.t('Create and Update')),
            getValue('CREATE', i18n.t('Create')),
            getValue('UPDATE', i18n.t('Update')),
            getValue('DELETE', i18n.t('Delete')),
        ],
    },

    atomicMode: {
        selected: 'ALL',
        values: [
            getValue('ALL', i18n.t('All')),
            getValue('NONE', i18n.t('None')),
        ],
    },

    mergeMode: {
        selected: 'MERGE',
        values: [
            getValue('MERGE', i18n.t('Merge')),
            getValue('REPLACE', i18n.t('Replace')),
        ],
    },

    flushMode: {
        selected: 'AUTO',
        values: [
            getValue('AUTO', i18n.t('Auto')),
            getValue('OBJECT', i18n.t('Object')),
        ],
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
        values: [
            getValue('NON_NULL', i18n.t('Non Null')),
            getValue('ALWAYS', i18n.t('Always')),
            getValue('NON_EMPTY', i18n.t('Non Empty')),
        ],
    },

    inclusion: {
        selected: 'selected',
        values: [
            getValue('selected', i18n.t('Selected organisation unit')),
            getValue(
                'children',
                i18n.t('Include children of organisation unit')
            ),
            getValue(
                'descendants',
                i18n.t('Include descendants of organisation unit')
            ),
        ],
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
        selected: today(),
    },

    endDate: {
        selected: today(),
    },

    compression: {
        selected: '.zip',
        values: [
            getValue('.zip', i18n.t('Zip')),
            getValue('.gz', i18n.t('Gzip')),
            getValue('none', i18n.t('Uncompressed')),
        ],
    },

    includeDeleted: getBoolean('false'),

    categoryOptionComboIdScheme: getScheme('UID'),

    schemas: {
        selected: [],
    },

    objectType: {
        selected: 'dataSets',
        values: [
            getValue('dataSets', i18n.t('Data sets')),
            getValue('programs', i18n.t('Programs')),
            getValue('categoryCombos', i18n.t('Category combination')),
            getValue('dashboards', i18n.t('Dashboard')),
            getValue('dataElementGroups', i18n.t('Data element groups')),
        ],
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
        values: [getValue(-1, i18n.t('[ All program stages]'))],
    },
}

export function getFormValues(list) {
    const o = {
        processing: false,
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
