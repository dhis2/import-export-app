import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
import { eventEmitter } from 'services'
import { FormBase } from 'components/FormBase'
import { CTX_DEFAULT, TYPE_FILE, TYPE_RADIO } from 'components/Form'
import { EventIcon } from 'components/Icon'
import { emitLogOnFirstResponse, fetchLog, getMimeType } from './helpers'

export class EventImport extends FormBase {
    static path = '/import/event'

    static order = 3
    static title = i18n.t('Event Import')
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
            label: null,
        },
        {
            context: CTX_DEFAULT,
            type: TYPE_RADIO,
            name: 'payloadFormat',
            label: i18n.t('Format'),
        },
        {
            context: CTX_DEFAULT,
            type: TYPE_RADIO,
            name: 'dryRun',
            label: i18n.t('Dry run'),
        },
        {
            context: CTX_DEFAULT,
            type: TYPE_RADIO,
            name: 'eventIdScheme',
            label: i18n.t('Event ID Scheme'),
        },
        {
            context: CTX_DEFAULT,
            type: TYPE_RADIO,
            name: 'orgUnitIdScheme',
            label: i18n.t('Org unit ID scheme'),
        },
    ]

    state = {
        processing: false,

        upload: {
            selected: null,
        },

        payloadFormat: {
            selected: 'json',
            values: [
                {
                    value: 'json',
                    label: i18n.t('JSON'),
                },
                {
                    value: 'xml',
                    label: i18n.t('XML'),
                },
                {
                    value: 'csv',
                    label: i18n.t('CSV'),
                },
            ],
        },

        dryRun: {
            selected: 'false',
            values: [
                {
                    value: 'false',
                    label: i18n.t('No'),
                },
                {
                    value: 'true',
                    label: i18n.t('Yes'),
                },
            ],
        },

        eventIdScheme: {
            selected: 'UID',
            values: [
                {
                    value: 'UID',
                    label: i18n.t('UID'),
                },
                {
                    value: 'CODE',
                    label: i18n.t('Code'),
                },
            ],
        },

        orgUnitIdScheme: {
            selected: 'UID',
            values: [
                {
                    value: 'UID',
                    label: i18n.t('UID'),
                },
                {
                    value: 'CODE',
                    label: i18n.t('Code'),
                },
                {
                    value: 'NAME',
                    label: i18n.t('Name'),
                },
                {
                    value: 'ATTRIBUTE:UKNKz1H10EE',
                    label: i18n.t('HR identifier'),
                },
            ],
        },
    }

    async componentDidMount() {
        await fetchLog('', 'EVENT_IMPORT')
    }

    onSubmit = async () => {
        try {
            const {
                upload,
                payloadFormat,
                dryRun,
                eventIdScheme,
                orgUnitIdScheme,
            } = this.getFormState()

            const contentType = getMimeType(upload.name)

            const params = []
            params.push(`payloadFormat=${payloadFormat}`)
            params.push(`dryRun=${dryRun}`)
            params.push('skipFirst=true')
            params.push(`eventIdScheme=${eventIdScheme}`)
            params.push(`orgUnitIdScheme=${orgUnitIdScheme}`)
            params.push('async=true')

            this.setState({ processing: true })

            const xhr = new XMLHttpRequest()
            xhr.withCredentials = true
            xhr.open(
                'POST',
                `${apiConfig.server}/api/events.json?${params.join('&')}`,
                true
            )
            xhr.setRequestHeader('Content-Type', contentType)
            xhr.setRequestHeader(
                'Content-Disposition',
                'attachment filename="' + upload.name + '"'
            )
            xhr.onreadystatechange = async e => {
                const status = Math.floor(xhr.status / 100)
                if (xhr.readyState === 4 && status === 2) {
                    eventEmitter.emit('summary.clear')

                    const jobId = emitLogOnFirstResponse(xhr, 'EVENT_IMPORT')
                    this.setState({ processing: false })

                    eventEmitter.emit('summary.loading')
                    await fetchLog(jobId, 'EVENT_IMPORT')
                } else if ([3, 4, 5].includes(status)) {
                    this.assertOnError(e)
                }
            }
            xhr.send(upload)
        } catch (e) {
            console.log('Event Import error', e, '\n')
        }
    }
}
