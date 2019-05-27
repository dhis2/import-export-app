import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { FormBase } from '../../components/FormBase'
import { DataIcon } from '../../components/Icon'
import {
    getFormFields,
    getFormFieldMoreOptions,
    getFormValues,
    getParamsFromFormState,
    getUploadXHR
} from '../../helpers'
import { fetchLog } from './helpers'

export class DataImport extends FormBase {
    static path = '/import/data'

    static order = 2
    static title = i18n.t('Data Import')
    static desc = i18n.t(
        'Import data values on the DXF 2 XML, JSON, CSV and PDF formatrant s. DXF 2 is the standard exchange format for DHIS 2.'
    )

    static menuIcon = <DataIcon />
    icon = <DataIcon />

    formWidth = 800
    formTitle = i18n.t('Data Import')
    submitLabel = i18n.t('Import')

    fields = [
        ...getFormFields([
            'upload',
            'format',
            'dryRun',
            'strategy',
            'preheatCache',
        ]),

        getFormFieldMoreOptions(),

        ...getFormFields([
            'dataElementIdScheme',
            'orgUnitIdScheme',
            'idScheme',
            'skipExistingCheck',
        ]),
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

            const { REACT_APP_DHIS2_BASE_URL } = process.env
            const url = `${REACT_APP_DHIS2_BASE_URL}/api/dataValueSets.json?${params}`
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
