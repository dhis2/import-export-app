import i18n from 'd2-i18n'
import { FormBase, CTX_DEFAULT, TYPE_RADIO } from 'components'

export class MetaDataExport extends FormBase {
  static path = '/export/metadata'

  static order = 5
  static title = i18n.t('Metadata Export')
  static description = i18n.t(
    'Export meta data like data elements and organisation units to the standard DHIS 2 exchange format.'
  )

  formWidth = 600
  formTitle = i18n.t('Meta Data Export')
  submitLabel = i18n.t('Export')

  fields = [
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'format',
      label: i18n.t('Format')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'compression',
      label: i18n.t('Compression')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'sharing',
      label: i18n.t('Sharing')
    }
  ]

  state = {
    format: {
      selected: 'json',
      values: [
        {
          value: 'json',
          label: i18n.t('JSON')
        },
        {
          value: 'xml',
          label: i18n.t('XML')
        }
      ]
    },
    compression: {
      selected: 'zip',
      values: [
        {
          value: 'zip',
          label: i18n.t('Zip')
        },
        {
          value: 'gz',
          label: i18n.t('Gzip')
        },
        {
          value: 'uncompressed',
          label: i18n.t('Uncompressed')
        }
      ]
    },
    sharing: {
      selected: 'true',
      values: [
        {
          value: 'true',
          label: i18n.t('With sharing')
        },
        {
          value: 'false',
          label: i18n.t('Without sharing')
        }
      ]
    }
  }

  onSubmit = () => {
    console.log('onSubmit Meta Data Export')
  }
}
