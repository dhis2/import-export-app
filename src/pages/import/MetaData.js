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
      context: CTX_CSV_OPTION,
      type: TYPE_SELECT,
      name: 'classKey',
      label: i18n.t('Object type')
    },

    {
      context: CTX_DEFAULT,
      type: TYPE_MORE_OPTIONS
    },

    {
      context: CTX_MORE_OPTIONS,
      type: TYPE_RADIO,
      name: 'atomicMode',
      label: i18n.t('Reference mode')
    }
  ]

  state = {
    _context: CTX_DEFAULT,
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
        }
      ]
    },

    classKey: {
      selected: 'ORGANISATION_UNIT_GROUP_MEMBERSHIP',
      values: [
        {
          label: i18n.t('Organisation unit group membership'),
          value: 'ORGANISATION_UNIT_GROUP_MEMBERSHIP'
        },
        {
          label: i18n.t('Data element group membership'),
          value: 'DATA_ELEMENT_GROUP_MEMBERSHIP'
        },
        {
          label: i18n.t('Indicator group membership'),
          value: 'INDICATOR_GROUP_MEMBERSHIP'
        },
        {
          label: i18n.t('Data element'),
          value: 'DATA_ELEMENT'
        },
        {
          label: i18n.t('Data element group'),
          value: 'DATA_ELEMENT_GROUP'
        },
        {
          label: i18n.t('Category option'),
          value: 'CATEGORY_OPTION'
        },
        {
          label: i18n.t('Category option group'),
          value: 'CATEGORY_OPTION_GROUP'
        },
        {
          label: i18n.t('Organisation unit'),
          value: 'ORGANISATION_UNIT'
        },
        {
          label: i18n.t('Organisation unit group'),
          value: 'ORGANISATION_UNIT_GROUP'
        },
        {
          label: i18n.t('Validation rule'),
          value: 'VALIDATION_RULE'
        },
        {
          label: i18n.t('Option set'),
          value: 'OPTION_SET'
        },
        {
          label: i18n.t('Translation'),
          value: 'TRANSLATION'
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
        }
      ]
    },

    atomicMode: {
      selected: 'NONE',
      values: [
        {
          value: 'NONE',
          label: i18n.t('Allow invalid references')
        },
        {
          value: 'ALL',
          label: i18n.t('Deny invalid references')
        }
      ]
    }
  }

  componentDidMount() {
    this.fetchLog()
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
        importFormat,
        classKey,
        dryRun,
        strategy,
        atomicMode
      } = this.getFormState()

      const formData = new FormData()
      formData.set('upload', upload)
      formData.set('importFormat', importFormat)
      formData.set('classKey', classKey)
      formData.set('dryRun', dryRun)
      formData.set('strategy', strategy)
      formData.set('atomicMode', atomicMode)

      eventEmitter.emit('log', {
        id: new Date().getTime(),
        d: new Date(),
        subject: 'MetaData Import',
        text: `Format: ${importFormat}
Dry Run: ${dryRun}
Strategy: ${strategy}
Reference Mode: ${atomicMode}
Object Type: ${classKey}`
      })
      eventEmitter.emit('log.open')

      this.setState({ processing: true })
      this.interval = setInterval(this.fetchLog, 2000)

      window
        .fetch(
          `${apiConfig.server}/dhis-web-importexport/importMetaData.action`,
          {
            body: formData,
            cache: 'no-cache',
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            redirect: 'follow'
          }
        )
        .then(async () => {
          this.setState({ processing: false })
        })
    } catch (e) {
      console.log('MetaData Import error', e, '\n')
    }
  }
}
