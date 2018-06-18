import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { FormBase } from 'components/FormBase'
import { CTX_DEFAULT, TYPE_RADIO, TYPE_SELECT } from 'components/Form'
import { api, eventEmitter } from 'services'
import { createBlob, downloadBlob } from 'helpers'
import { MetadataDependencyExportIcon } from 'components/Icon'

export class MetaDataDependencyExport extends FormBase {
  static path = '/export/metadata-dependency'

  static order = 9
  static title = i18n.t('Metadata Dependency Export')
  static description = i18n.t(
    'Export metadata like data sets and programs including related metadata objects.'
  )
  static menuIcon = <MetadataDependencyExportIcon />
  icon = <MetadataDependencyExportIcon />

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
    processing: false,
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
      selected: '.zip',
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
          value: 'none',
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

  onSubmit = async () => {
    try {
      const {
        objectType,
        objectList,
        format,
        compression
      } = this.getFormState()

      let endpoint = `metadata${format}`
      if (compression !== 'none') {
        endpoint += compression
      }

      eventEmitter.emit('log', {
        id: new Date().getTime(),
        d: new Date(),
        subject: 'MetaData Dependency Export',
        text: `Object Type: ${objectType}
Object List: ${objectList}
Format: ${format.substr(1)}
Compression: ${compression.substr(1)}`
      })
      eventEmitter.emit('log.open')

      const baseURL = api.url('')
      const url = `${baseURL}${objectType}/${objectList}/${endpoint}?attachment=${endpoint}&format=${format.substr(
        1
      )}`
      if (compression !== 'none') {
        window.location = url
        return
      }

      this.setState({ processing: true }, async () => {
        const { data } = await api.get(url)
        let contents = data
        if (format === '.json') {
          contents = JSON.stringify(data)
        }

        downloadBlob(createBlob(contents, format, compression), endpoint)
        this.setState({ processing: false })
      })
    } catch (e) {
      console.log('MetaDataDependency Export error', e, '\n')
    }
  }
}
