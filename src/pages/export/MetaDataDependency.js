import i18n from '@dhis2/d2-i18n'
import { FormBase, CTX_DEFAULT, TYPE_RADIO, TYPE_SELECT } from 'components'
import { api } from 'services'

export class MetaDataDependencyExport extends FormBase {
  static path = '/export/metadata-dependency'

  static order = 6
  static title = i18n.t('Metadata Dependency Export')
  static description = i18n.t(
    'Export metadata like data sets and programs including related metadata objects.'
  )

  formWidth = 800
  formTitle = i18n.t('Metadata Export with Dependencies')
  submitLabel = i18n.t('Export')

  fields = [
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'objectType',
      label: i18n.t('Object type')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_SELECT,
      name: 'objectList',
      label: i18n.t('Object')
    },
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
    }
  ]

  state = {
    objectType: {
      selected: 'dataSets',
      values: [
        {
          value: 'dataSets',
          label: i18n.t('Data sets')
        },
        {
          value: 'programs',
          label: i18n.t('Programs')
        },
        {
          value: 'categoryCombos',
          label: i18n.t('Category combination')
        },
        {
          value: 'dashboards',
          label: i18n.t('Dashboard')
        },
        {
          value: 'dataElementGroups',
          label: i18n.t('Data element groups')
        }
      ]
    },
    objectList: {
      selected: '',
      values: []
    },
    format: {
      selected: '.json',
      values: [
        {
          value: '.json',
          label: i18n.t('JSON')
        },
        {
          value: '.xml',
          label: i18n.t('XML')
        }
      ]
    },
    compression: {
      selected: '',
      values: [
        {
          value: '.zip',
          label: i18n.t('Zip')
        },
        {
          value: '.gz',
          label: i18n.t('Gzip')
        },
        {
          value: '',
          label: i18n.t('Uncompressed')
        }
      ]
    }
  }

  async componentDidMount() {
    await this.fetch()
  }

  async fetch() {
    try {
      const objectType = this.state.objectType.selected
      const { data } = await api.get(
        `${objectType}?fields=id,displayName&paging=false`
      )
      const values = data[objectType].map(({ id, displayName }) => ({
        value: id,
        label: displayName
      }))

      this.setState({
        objectList: {
          values,
          selected: values[0]['value']
        }
      })
    } catch (e) {
      console.log('fetch Schemas failed')
      console.log(e)
    }
  }

  onFormUpdate = (name, value) => {
    if (name === 'objectType') {
      this.fetch()
    }
  }

  onSubmit = () => {
    console.log('onSubmit Meta Data Dependency Export')
  }
}
