import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
import { eventEmitter } from 'services'
import { FormBase } from 'components/FormBase'
import { DataIcon } from 'components/Icon'
import {
    getFormField,
    getFormFieldMoreOptions,
    getFormValues,
    getParamsFromFormState,
} from 'helpers'
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
        getFormField('upload'),
        getFormField('format'),
        getFormField('dryRun'),
        getFormField('strategy'),
        getFormField('preheatCache'),

        getFormFieldMoreOptions(),

        getFormField('dataElementIdScheme'),
        getFormField('orgUnitIdScheme'),
        getFormField('idScheme'),
        getFormField('skipExistingCheck'),
    ]

    state = getFormValues([
        'upload',
        'format:.json:json,xml,csv,pdf,adx',
        'dryRun',
        'strategy',
        'preheatCache',
        'dataElementIdScheme',
        'orgUnitIdScheme',
        'idScheme',
        'skipExistingCheck',
    ])

    async componentDidMount() {
        await fetchLog('', 'DATAVALUE_IMPORT')
    }

    onSubmit = () => {
        try {
            const { upload, format } = this.getFormState()
            const formData = new FormData()
            formData.set('upload', upload)

            const params = getParamsFromFormState(
                this.getFormState(),
                [
                    'dataElementIdScheme',
                    'dryRun',
                    'idScheme',
                    'orgUnitIdScheme',
                    'preheatCache',
                    'skipExistingCheck',
                    'strategy',
                ],
                [`format=${format.substr(1)}`, 'async=true']
            )

            console.log('params', params)

            const contentType = getMimeType(upload.name)

            this.setState({ processing: true })

            const xhr = new XMLHttpRequest()
            xhr.withCredentials = true
            xhr.open(
                'POST',
                `${apiConfig.server}/api/dataValueSets.json?${params}`,
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

                    const jobId = emitLogOnFirstResponse(
                        xhr,
                        'DATAVALUE_IMPORT'
                    )
                    this.setState({ processing: false })

                    eventEmitter.emit('summary.loading')
                    await fetchLog(jobId, 'DATAVALUE_IMPORT')
                } else if ([3, 4, 5].includes(status)) {
                    this.assertOnError(e)
                }
            }
            xhr.send(upload)
        } catch (e) {
            console.log('Data Import error', e, '\n')
        }
    }
}
