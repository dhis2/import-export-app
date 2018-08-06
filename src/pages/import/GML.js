import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
import { eventEmitter } from 'services'
import { FormBase } from 'components/FormBase'
import {
  CTX_DEFAULT,
  CTX_CSV_OPTION,
  TYPE_FILE,
  TYPE_RADIO,
  TYPE_SELECT
} from 'components/Form'
import { GMLIcon } from 'components/Icon'
import { api } from 'services'
import { fetchLog, getMimeType } from './helpers'

export class GMLImport extends FormBase {
  static path = '/import/gml'

  static order = 4
  static title = i18n.t('GML Import')
  static menuIcon = <GMLIcon />
  icon = <GMLIcon />

  formWidth = 600
  formTitle = i18n.t('GML Import')
  formDescription = i18n.t(
    'Only import of GML data for existing organisation units is supported.'
  )
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
      name: 'format',
      label: i18n.t('Format')
    },
    {
      context: CTX_CSV_OPTION,
      type: TYPE_SELECT,
      name: 'classKey',
      label: i18n.t('Class Key')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'dryRun',
      label: i18n.t('Dry run')
    }
  ]

  state = {
    processing: false,

    upload: {
      selected: null
    },

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
        },
        {
          value: 'csv',
          label: i18n.t('CSV')
        }
      ]
    },

    classKey: {
      selected: '',
      values: []
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
    }
  }

  async componentDidMount() {
    await fetchLog('GML_IMPORT')
    await this.fetch()
  }

  async fetch() {
    try {
      const { data } = await api.get('metadata/csvImportClasses')
      const values = data.map(v => ({
        value: v,
        label: v.split('_').join(' ')
      }))

      this.setState({
        classKey: {
          values,
          selected: values[0]['value']
        }
      })
    } catch (e) {
      console.log('fetch csvImportClasses failed')
      console.log(e)
    }
  }

  onFormUpdate = (name, value) => {
    if (name === 'format') {
      const { _context } = this.state

      if (value === 'csv' && _context !== CTX_CSV_OPTION) {
        this.changeContext(CTX_CSV_OPTION)
      } else {
        this.changeContext(CTX_DEFAULT)
      }
    }
  }

  onSubmit = async () => {
    try {
      const { upload, format, classKey, dryRun } = this.getFormState()

      const formData = new FormData()
      formData.set('upload', upload)

      const contentType = getMimeType(upload.name)

      const params = []
      params.push(`dryRun=${dryRun}`)

      if (format === 'csv') {
        params.push(`classKey=${classKey}`)
      }

      eventEmitter.emit('log.open')
      this.setState({ processing: true })

      const xhr = new XMLHttpRequest()
      xhr.withCredentials = true
      xhr.open(
        'POST',
        `${apiConfig.server}/api/metadata/gml?${params.join('&')}`,
        true
      )
      xhr.setRequestHeader('Content-Type', contentType)
      xhr.setRequestHeader(
        'Content-Disposition',
        'attachment filename="' + upload.name + '"'
      )
      xhr.onreadystatechange = async () => {
        if (xhr.readyState === 4 && Math.floor(xhr.status / 100) === 2) {
          console.log(xhr.response)
          this.setState({ processing: false })
          await fetchLog('GML_IMPORT')
        }
      }
      xhr.send(upload)
    } catch (e) {
      console.log('GML Import error', e, '\n')
    }
  }
}
