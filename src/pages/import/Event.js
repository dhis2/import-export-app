import i18n from 'd2-i18n'
import { FormBase, CTX_DEFAULT, TYPE_FILE, TYPE_RADIO } from 'components'

export class EventImport extends FormBase {
  static path = '/import/event'

  static order = 4
  static title = i18n.t('Event Import')
  static description = i18n.t(
    'Import events for programs, stages and tracked entities in the DXF 2 format.'
  )

  formWidth = 600
  formTitle = i18n.t('Event Import')
  submitLabel = i18n.t('Import')

  fields = [
    {
      context: CTX_DEFAULT,
      type: TYPE_FILE,
      name: 'file',
      label: null
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'payloadFormat',
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
      name: 'eventIdScheme',
      label: i18n.t('Event ID Scheme')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'orgUnitIdScheme',
      label: i18n.t('Org unit ID scheme')
    }
  ]

  state = {
    payloadFormat: {
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

    eventIdScheme: {
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
    }
  }

  onSubmit = () => {
    console.log('onSubmit Event Import')
  }
}
