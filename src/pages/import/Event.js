import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
import { api, eventEmitter } from 'services'
import { FormBase } from 'components/FormBase'
import { CTX_DEFAULT, TYPE_FILE, TYPE_RADIO } from 'components/Form'
import { EventIcon } from 'components/Icon'

export class EventImport extends FormBase {
  static path = '/import/event'

  static order = 3
  static title = i18n.t('Event Import')
  static description = i18n.t(
    'Import events for programs, stages and tracked entities in the DXF 2 format.'
  )
  static menuIcon = <EventIcon />
  icon = <EventIcon />

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

  componentDidMount() {
    this.fetchLog()
  }

  lastId = null
  fetchLog = async () => {
    try {
      let url = '../system/tasks/EVENT_IMPORT'
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
            subject: 'Event Import',
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
      console.log('Error fetching EVENT_IMPORT')
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
        id: new Date().getTime(),
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
      this.interval = setInterval(this.fetchLog, 2000)

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
