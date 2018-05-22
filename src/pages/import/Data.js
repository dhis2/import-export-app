import i18n from '@dhis2/d2-i18n'
import {
  FormBase,
  CTX_DEFAULT,
  CTX_MORE_OPTIONS,
  TYPE_FILE,
  TYPE_RADIO,
  TYPE_MORE_OPTIONS
} from 'components'

export class DataImport extends FormBase {
  static path = '/import/data'

  static order = 2
  static title = i18n.t('Data Import')
  static description = i18n.t(
    'Import data values on the DXF 2 XML, JSON, CSV and PDF formats. DXF 2 is the standard exchange format for DHIS 2.'
  )

  formWidth = 600
  formTitle = i18n.t('Data Import')
  submitLabel = i18n.t('Import')

  fields = [
    {
      context: CTX_DEFAULT,
      type: TYPE_FILE,
      name: 'upload',
      label: null
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'importFormat',
      label: i18n.t('Format')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'dryRun',
      label: i18n.t('Dry run')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'strategy',
      label: i18n.t('Strategy')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'preheatCache',
      label: i18n.t('Preheat cache')
    },

    {
      context: CTX_DEFAULT,
      type: TYPE_MORE_OPTIONS
    },

    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_RADIO,
      name: 'dataElementIdScheme',
      label: i18n.t('Data element ID scheme')
    },
    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_RADIO,
      name: 'orgUnitIdScheme',
      label: i18n.t('Org unit ID scheme')
    },
    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_RADIO,
      name: 'idScheme',
      label: i18n.t('ID scheme (all objects)')
    },
    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_RADIO,
      name: 'skipExistingCheck',
      label: i18n.t('Existing record check')
    }
  ]

  state = {
    processing: false,

    upload: {
      selected: null
    },

    importFormat: {
      selected: 'json',
      values: [
        {
          value: 'json',
          label: i18n.t('JSON')
        },
        {
          value: 'xml',
          label: i18n.t('XML')
        },
        {
          value: 'csv',
          label: i18n.t('CSV')
        },
        {
          value: 'pdf',
          label: i18n.t('PDF')
        },
        {
          value: 'adx',
          label: i18n.t('ADX')
        }
      ]
    },

    dryRun: {
      selected: 'false',
      values: [
        {
          value: 'false',
          label: i18n.t('No')
        },
        {
          value: 'true',
          label: i18n.t('Yes')
        }
      ]
    },

    strategy: {
      selected: 'NEW_AND_UPDATES',
      values: [
        {
          value: 'NEW_AND_UPDATES',
          label: i18n.t('New and Updates')
        },
        {
          value: 'NEW',
          label: i18n.t('New only')
        },
        {
          value: 'UPDATES',
          label: i18n.t('Updates only')
        },
        {
          value: 'DELETE',
          label: i18n.t('Delete')
        }
      ]
    },

    preheatCache: {
      selected: 'false',
      values: [
        {
          value: 'false',
          label: i18n.t('No')
        },
        {
          value: 'true',
          label: i18n.t('Yes (faster for large imports)')
        }
      ]
    },

    dataElementIdScheme: {
      selected: 'UID',
      values: [
        {
          value: 'UID',
          label: i18n.t('UID')
        },
        {
          value: 'CODE',
          label: i18n.t('Code')
        }
      ]
    },

    orgUnitIdScheme: {
      selected: 'UID',
      values: [
        {
          value: 'UID',
          label: i18n.t('UID')
        },
        {
          value: 'CODE',
          label: i18n.t('Code')
        },
        {
          value: 'NAME',
          label: i18n.t('Name')
        },
        {
          value: 'ATTRIBUTE:UKNKz1H10EE',
          label: i18n.t('HR identifier')
        }
      ]
    },

    idScheme: {
      selected: 'UID',
      values: [
        {
          value: 'UID',
          label: i18n.t('UID')
        },
        {
          value: 'CODE',
          label: i18n.t('Code')
        }
      ]
    },

    skipExistingCheck: {
      selected: 'false',
      values: [
        {
          value: 'false',
          label: i18n.t('Check (safe, recommended)')
        },
        {
          value: 'true',
          label: i18n.t('Skip check (fast)')
        }
      ]
    }
  }

  onSubmit = () => {
    console.log('onSubmit Data Import')
  }
}
