import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
import { eventEmitter } from 'services'
import { FormBase } from 'components/FormBase'
import { CTX_DEFAULT } from 'components/Form'
import { EventIcon } from 'components/Icon'
import { getFormField, getFormValues } from 'helpers'
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
        getFormField('upload'),
        getFormField('format'),
        getFormField('dryRun'),
        getFormField('eventIdScheme'),
        getFormField('orgUnitIdScheme', { context: CTX_DEFAULT }),
    ]

    state = getFormValues([
        'upload',
        'format:.json:json,xml,csv',
        'dryRun',
        'eventIdScheme',
        'orgUnitIdScheme',
    ])

    async componentDidMount() {
        await fetchLog('', 'EVENT_IMPORT')
    }

    onSubmit = async () => {
        try {
            const {
                upload,
                format,
                dryRun,
                eventIdScheme,
                orgUnitIdScheme,
            } = this.getFormState()

            const contentType = getMimeType(upload.name)
            const ext = format.slice(1)

            const params = []
            params.push(`payloadFormat=${ext}`)
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
