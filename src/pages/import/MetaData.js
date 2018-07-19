import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
import { api, eventEmitter } from 'services'
import { FormBase } from 'components/FormBase'
import {
  CTX_DEFAULT,
  TYPE_FILE,
  TYPE_RADIO,
  CTX_CSV_OPTION,
  CTX_MORE_OPTIONS,
  TYPE_MORE_OPTIONS
} from 'components/Form'
import { MetadataImportIcon } from 'components/Icon'

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
    await this.fetchLog()
  }

  lastId = null
  fetchLog = async () => {
    try {
      let url = '../system/tasks/METADATA_IMPORT'
      if (this.lastId) {
        url += `?lastId=${this.lastId}`
      }
      const { data } = await api.get(url)

      if (data.length > 0) {
        this.lastId = data[0]['uid']

        for (let i = data.length - 1; i >= 0; i -= 1) {
          const { category, completed, level, message, time, uid } = data[i]
          eventEmitter.emit('log', {
            id: uid,
            d: new Date(time),
            subject: 'MetaData Import',
            text: `Completed: ${completed}
Level: ${level}
Category: ${category}
Message:
${message}`
          })
        }
        eventEmitter.emit('log.open')

        if (data.filter(item => item.completed).length > 0) {
          clearInterval(this.interval)
        }
      }
    } catch (e) {
      console.log('Error fetching METADATA_IMPORT')
    }
  }

  onFormUpdate = (name, value) => {
    if (name === 'importFormat') {
      const { _context } = this.state

      if (value === 'csv' && _context !== CTX_CSV_OPTION) {
        this.changeContext(CTX_CSV_OPTION)
      } else {
        this.changeContext(CTX_DEFAULT)
      }
    }
  }

  onSubmit = () => {
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
        inclusionStrategy
      } = this.getFormState()

      const formData = new FormData()

      let contentType = null
      if (upload.name.endsWith('.json')) {
        contentType = 'application/json'
      } else if (upload.name.endsWith('.xml')) {
        contentType = 'text/xml'
      }

      formData.set('upload', upload)
      formData.set('importMode', importMode)
      formData.set('identifier', identifier)
      formData.set('importReportMode', importReportMode)
      formData.set('preheatMode', preheatMode)
      formData.set('importStrategy', importStrategy)
      formData.set('atomicMode', atomicMode)
      formData.set('mergeMode', mergeMode)
      formData.set('flushMode', flushMode)
      formData.set('skipSharing', skipSharing)
      formData.set('skipValidation', skipValidation)
      formData.set('async', async)
      formData.set('inclusionStrategy', inclusionStrategy)
      formData.set('userOverrideMode', 'None')
      formData.set('overrideUser', '')

      eventEmitter.emit('log', {
        id: new Date().getTime(),
        d: new Date(),
        subject: 'MetaData Import',
        text: `Content-Type: ${contentType}
Import mode: ${importMode}
Identifier: ${identifier}
Import report mode: ${importReportMode}
Preheat mode: ${preheatMode}
Import strategy: ${importStrategy}
Atomic mode: ${atomicMode}
Merge mode: ${mergeMode}
Flush mode: ${flushMode}
Skip sharing: ${skipSharing}
Skip validation: ${skipValidation}
Async: ${async}
Inclusion strategy: ${inclusionStrategy}`
      })
      eventEmitter.emit('log.open')

      this.setState({ processing: true })
      this.interval = setInterval(this.fetchLog, 2000)

      window
        .fetch(`${apiConfig.server}/api/${apiConfig.version}/metadata`, {
          body: formData,
          cache: 'no-cache',
          credentials: 'include',
          method: 'POST',
          mode: 'cors',
          redirect: 'follow',
          headers: {
            'Content-Type': contentType
          }
        })
        .then(async () => {
          this.setState({ processing: false })
        })
    } catch (e) {
      console.log('MetaData Import error', e, '\n')
    } finally {

    }
  }
}
