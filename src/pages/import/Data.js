import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
import { FormBase } from 'components/FormBase'
import { DataIcon } from 'components/Icon'
import {
    getFormField,
    getFormFieldMoreOptions,
    getFormValues,
    getParamsFromFormState,
    getUploadXHR,
} from 'helpers'
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

            this.setProcessing()

            const url = `${apiConfig.server}/api/dataValueSets.json?${params}`
            const xhr = getUploadXHR(
                url,
                upload,
                'DATAVALUE_IMPORT',
                this.clearProcessing,
                this.assertOnError
            )

            xhr.send(upload)
        } catch (e) {
            console.log('Data Import error', e, '\n')
        }
    }
}
