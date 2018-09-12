import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
import { api, eventEmitter } from 'services'
import { FormBase } from 'components/FormBase'
import {
  CTX_DEFAULT,
  TYPE_FILE,
  TYPE_RADIO,
  TYPE_SELECT,
  CTX_CSV_OPTION,
  CTX_MORE_OPTIONS,
  TYPE_MORE_OPTIONS
} from 'components/Form'
import { MetadataImportIcon } from 'components/Icon'
import { fetchLog, getMimeType, emitLogOnFirstResponse } from './helpers'

export class MetaDataImport extends FormBase {
  static path = '/import/metadata'

  static order = 1
  static menuIcon = <MetadataImportIcon />
  static title = i18n.t('Metadata Import')
  icon = <MetadataImportIcon />

  formWidth = 600
  formTitle = i18n.t('Metadata Import')
  submitLabel = i18n.t('Import')

  fields = [
    {
      context: CTX_DEFAULT,
      type: TYPE_FILE,
      name: 'upload',
      label: null
    },
    {
      context: CTX_CSV_OPTION,
      type: TYPE_SELECT,
      name: 'classKey',
      label: i18n.t('Object type')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'importMode',
      label: i18n.t('Import Mode')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'identifier',
      label: i18n.t('Identifier')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'importReportMode',
      label: i18n.t('Report Mode')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'preheatMode',
      label: i18n.t('Preheat Mode')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'importStrategy',
      label: i18n.t('Import Strategy')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'atomicMode',
      label: i18n.t('Atomic Mode')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_RADIO,
      name: 'mergeMode',
      label: i18n.t('Merge Mode')
    },
    {
      context: CTX_DEFAULT,
      type: TYPE_MORE_OPTIONS
    },
    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_RADIO,
      name: 'flushMode',
      label: i18n.t('Flush Mode')
    },
    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_RADIO,
      name: 'skipSharing',
      label: i18n.t('Skip Sharing')
    },
    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_RADIO,
      name: 'skipValidation',
      label: i18n.t('Skip Validation')
    },
    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_RADIO,
      name: 'async',
      label: i18n.t('Async')
    },
    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_RADIO,
      name: 'inclusionStrategy',
      label: i18n.t('Inclusion Strategy')
    }
  ]

  state = {
    _context: CTX_DEFAULT,
    processing: false,

    upload: {
      selected: null
    },

    classKey: {
      selected: '',
      values: []
    },

    importMode: {
      selected: 'COMMIT',
      values: [
        {
          value: 'COMMIT',
          label: i18n.t('Commit')
        },
        {
          value: 'VALIDATE',
          label: i18n.t('Validate')
        }
      ]
    },
    identifier: {
      selected: 'UID',
      values: [
        {
          value: 'UID',
          label: i18n.t('UID')
        },
        {
          value: 'CODE',
          label: i18n.t('CODE')
        },
        {
          value: 'AUTO',
          label: i18n.t('AUTO')
        }
      ]
    },
    importReportMode: {
      selected: 'ERRORS',
      values: [
        {
          value: 'ERRORS',
          label: i18n.t('Errors')
        },
        {
          value: 'FULL',
          label: i18n.t('Full')
        },
        {
          value: 'DEBUG',
          label: i18n.t('Debug')
        }
      ]
    },
    preheatMode: {
      selected: 'REFERENCE',
      values: [
        {
          value: 'REFERENCE',
          label: i18n.t('Reference')
        },
        {
          value: 'ALL',
          label: i18n.t('All')
        },
        {
          value: 'NONE',
          label: i18n.t('None')
        }
      ]
    },
    importStrategy: {
      selected: 'CREATE_AND_UPDATE',
      values: [
        {
          value: 'CREATE_AND_UPDATE',
          label: i18n.t('Create and Update')
        },
        {
          value: 'CREATE',
          label: i18n.t('Create')
        },
        {
          value: 'UPDATE',
          label: i18n.t('Update')
        },
        {
          value: 'DELETE',
          label: i18n.t('Delete')
        }
      ]
    },
    atomicMode: {
      selected: 'ALL',
      values: [
        {
          value: 'ALL',
          label: i18n.t('All')
        },
        {
          value: 'NONE',
          label: i18n.t('None')
        }
      ]
    },
    mergeMode: {
      selected: 'MERGE',
      values: [
        {
          value: 'MERGE',
          label: i18n.t('Merge')
        },
        {
          value: 'REPLACE',
          label: i18n.t('Replace')
        }
      ]
    },
    flushMode: {
      selected: 'AUTO',
      values: [
        {
          value: 'AUTO',
          label: i18n.t('Auto')
        },
        {
          value: 'OBJECT',
          label: i18n.t('Object')
        }
      ]
    },
    skipSharing: {
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
    skipValidation: {
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
    async: {
      selected: 'true',
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
    inclusionStrategy: {
      selected: 'NON_NULL',
      values: [
        {
          value: 'NON_NULL',
          label: i18n.t('Non Null')
        },
        {
          value: 'ALWAYS',
          label: i18n.t('Always')
        },
        {
          value: 'NON_EMPTY',
          label: i18n.t('Non Empty')
        }
      ]
    }
  }

  async componentDidMount() {
    await fetchLog('', 'METADATA_IMPORT')
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
    if (name === 'upload') {
      const { _context } = this.state
      const { type } = value

      if (type.endsWith('/csv') && _context !== CTX_CSV_OPTION) {
        this.changeContext(CTX_CSV_OPTION)
      } else {
        this.changeContext(CTX_DEFAULT)
      }
    }
  }

  onSubmit = async () => {
    try {
      const {
        upload,
        importMode,
        identifier,
        importReportMode,
        preheatMode,
        importStrategy,
        atomicMode,
        mergeMode,
        flushMode,
        skipSharing,
        skipValidation,
        async,
        inclusionStrategy,
        classKey
      } = this.getFormState()

      const formData = new FormData()
      formData.set('upload', upload)

      const contentType = getMimeType(upload.name)

      const params = []
      params.push(`importMode=${encodeURI(importMode)}`)
      params.push(`identifier=${encodeURI(identifier)}`)
      params.push(`importReportMode=${encodeURI(importReportMode)}`)
      params.push(`preheatMode=${encodeURI(preheatMode)}`)
      params.push(`importStrategy=${encodeURI(importStrategy)}`)
      params.push(`atomicMode=${encodeURI(atomicMode)}`)
      params.push(`mergeMode=${encodeURI(mergeMode)}`)
      params.push(`flushMode=${encodeURI(flushMode)}`)
      params.push(`skipSharing=${encodeURI(skipSharing)}`)
      params.push(`skipValidation=${encodeURI(skipValidation)}`)
      params.push(`async=${encodeURI(async)}`)
      params.push(`inclusionStrategy=${encodeURI(inclusionStrategy)}`)
      // params.push(`userOverrideMode=NONE`)
      // params.push(`overrideUser=`)

      if (contentType.endsWith('/csv')) {
        params.push(`classKey=${classKey}`)
      }

      eventEmitter.emit('log.open')
      this.setState({ processing: true })

      const xhr = new XMLHttpRequest()
      xhr.withCredentials = true
      xhr.open(
        'POST',
        `${apiConfig.server}/api/metadata.json?${params.join('&')}`,
        true
      )
      xhr.setRequestHeader('Content-Type', contentType)
      xhr.setRequestHeader(
        'Content-Disposition',
        'attachment filename="' + upload.name + '"'
      )
      xhr.onreadystatechange = async () => {
        if (xhr.readyState === 4 && Math.floor(xhr.status / 100) === 2) {
          const jobId = emitLogOnFirstResponse(xhr, 'METADATA_IMPORT')
          this.setState({ processing: false })
          await fetchLog(jobId, 'METADATA_IMPORT')
        }
      }
      xhr.send(upload)
    } catch (e) {
      console.log('MetaData Import error', e, '\n')
    } finally {
    }
  }
}
