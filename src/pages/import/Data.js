import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
import { api, eventEmitter } from 'services'
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
    'Import data values on the DXF 2 XML, JSON, CSV and PDF formatrant s. DXF 2 is the standard exchange format for DHIS 2.'
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

  componentDidMount() {
    this.fetchLog()
  }

  lastId = null
  fetchLog = async () => {
    try {
      let url = '../system/tasks/DATAVALUE_IMPORT'
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
            subject: 'Data Import',
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
      console.log('Error fetching DATAVALUE_IMPORT')
    }
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
      formData.set('importFormat', importFormat)
      formData.set('dryRun', dryRun)
      formData.set('strategy', strategy)
      formData.set('preheatCache', preheatCache)
      formData.set('dataElementIdScheme', dataElementIdScheme)
      formData.set('orgUnitIdScheme', orgUnitIdScheme)
      formData.set('idScheme', idScheme)
      formData.set('skipExistingCheck', skipExistingCheck)

      eventEmitter.emit('log', {
        id: new Date().getTime(),
        d: new Date(),
        subject: 'Data Import',
        text: `Format: ${importFormat}
Dry Run: ${dryRun}
Strategy: ${strategy}
Preheat cache: ${preheatCache}
Data element ID scheme: ${dataElementIdScheme}
Org. unit ID scheme: ${orgUnitIdScheme}
ID scheme: ${idScheme}
Skip existing record check: ${skipExistingCheck}`
      })
      eventEmitter.emit('log.open')

      this.setState({ processing: true })
      this.interval = setInterval(this.fetchLog, 2000)

      window
        .fetch(
          `${apiConfig.server}/dhis-web-importexport/importDataValue.action`,
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
      console.log('Data Import error', e, '\n')
    }
  }
}
