import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
import { eventEmitter } from 'services'
import { FormBase } from 'components/FormBase'
import {
  CTX_DEFAULT,
  CTX_MORE_OPTIONS,
  TYPE_FILE,
  TYPE_RADIO,
  TYPE_MORE_OPTIONS
} from 'components/Form'
import { DataIcon } from 'components/Icon'
import { emitLogOnFirstResponse, getMimeType } from './helpers'
import { fetchLog } from './helpers'

export class DataImport extends FormBase {
  static path = '/import/data'

  static order = 2
  static title = i18n.t('Data Import')
  static menuIcon = <DataIcon />
  icon = <DataIcon />

  formWidth = 700
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

  async componentDidMount() {
    await fetchLog('', 'DATAVALUE_IMPORT')
  }

  onSubmit = () => {
    try {
      const {
        upload,
        importFormat,
        dryRun,
        strategy,
        preheatCache,
        dataElementIdScheme,
        orgUnitIdScheme,
        idScheme,
        skipExistingCheck
      } = this.getFormState()

      const formData = new FormData()
      formData.set('upload', upload)

      const params = []
      params.push(`importFormat=${importFormat}`)
      params.push(`dryRun=${dryRun}`)
      params.push(`strategy=${strategy}`)
      params.push(`preheatCache=${preheatCache}`)
      params.push(`dataElementIdScheme=${dataElementIdScheme}`)
      params.push(`orgUnitIdScheme=${orgUnitIdScheme}`)
      params.push(`idScheme=${idScheme}`)
      params.push(`skipExistingCheck=${skipExistingCheck}`)
      params.push('async=true')

      const contentType = getMimeType(upload.name)

      eventEmitter.emit('log.open')
      this.setState({ processing: true })

      const xhr = new XMLHttpRequest()
      xhr.withCredentials = true
      xhr.open(
        'POST',
        `${apiConfig.server}/api/dataValueSets?${params.join('&')}`,
        true
      )
      xhr.setRequestHeader('Content-Type', contentType)
      xhr.setRequestHeader(
        'Content-Disposition',
        'attachment filename="' + upload.name + '"'
      )
      xhr.onreadystatechange = async () => {
        if (xhr.readyState === 4 && Math.floor(xhr.status / 100) === 2) {
          const jobId = emitLogOnFirstResponse(xhr, 'DATAVALUE_IMPORT')
          this.setState({ processing: false })
          await fetchLog(jobId, 'DATAVALUE_IMPORT')
        }
      }
      xhr.send(upload)
    } catch (e) {
      console.log('Data Import error', e, '\n')
    }
  }
}
