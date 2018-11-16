import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
import { eventEmitter } from 'services'
import { FormBase } from 'components/FormBase'
import { CTX_DEFAULT } from 'components/Form'
import { EventIcon } from 'components/Icon'
import {
    getFormField,
    getFormValues,
    getParamsFromFormState,
    getUploadXHR,
} from 'helpers'
import { emitLogOnFirstResponse, fetchLog } from './helpers'

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
            const { upload, format } = this.getFormState()

            const params = getParamsFromFormState(
                this.getFormState(),
                ['dryRun', 'eventIdScheme', 'orgUnitIdScheme'],
                [
                    'async=true',
                    'skipFirst=true',
                    `payloadFormat=${format.slice(1)}`,
                ]
            )
            this.setState({ processing: true })

            const url = `${apiConfig.server}/api/events.json?${params}`
            const xhr = getUploadXHR(url, upload)

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
