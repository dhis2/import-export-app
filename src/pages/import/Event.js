import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
import { eventEmitter } from 'services'
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
      name: 'upload',
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
    processing: false,

    upload: {
      selected: null
    },

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
    try {
      const {
        upload,
        payloadFormat,
        dryRun,
        eventIdScheme,
        orgUnitIdScheme
      } = this.getFormState()

      const formData = new FormData()
      formData.set('upload', upload)
      formData.set('payloadFormat', payloadFormat)
      formData.set('dryRun', dryRun)
      formData.set('skipFirst', 'true')
      formData.set('eventIdScheme', eventIdScheme)
      formData.set('orgUnitIdScheme', orgUnitIdScheme)

      eventEmitter.emit('log', {
        d: new Date(),
        subject: 'Event Import',
        text: `Format: ${payloadFormat}
Dry run: ${dryRun}
Skip first: true
Event ID scheme: ${eventIdScheme}
Org. unit ID scheme: ${orgUnitIdScheme}`
      })
      eventEmitter.emit('log.open')

      this.setState({ processing: true })
      window
        .fetch(
          `${apiConfig.server}/dhis-web-importexport/importEvents.action`,
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
      console.log('Event Import error', e, '\n')
    }
  }
}
