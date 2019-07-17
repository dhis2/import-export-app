import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { FormBase } from '../../components/FormBase'
import { CTX_DEFAULT, CTX_CSV_OPTION } from '../../components/Form'
import { DataIcon } from '../../components/Icon'
import {
    getFormFields,
    getFormFieldMoreOptions,
    getFormValues,
    getParamsFromFormState,
    getUploadXHR,
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
            'firstRowIsHeader',
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
        'firstRowIsHeader',
    ])

    async componentDidMount() {
        await fetchLog('', 'DATAVALUE_IMPORT')
    }

    onFormUpdate = (name, value) => {
        if (name === 'format') {
            const { _context } = this.state

            if (value === '.csv' && _context !== CTX_CSV_OPTION) {
                this.changeContext(CTX_CSV_OPTION)
            } else {
                this.changeContext(CTX_DEFAULT)
            }
        }
    }

    onSubmit = () => {
        try {
            const { upload, format, firstRowIsHeader } = this.getFormState()
            const formattedFormat = format.substr(1)
            const append = [`format=${formattedFormat}`, 'async=true']

            if (format === '.csv') {
                append.push(`firstRowIsHeader=${firstRowIsHeader}`)
            }

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
                append
            )

            this.setProcessing()

            const { REACT_APP_DHIS2_BASE_URL } = process.env
            const url = `${REACT_APP_DHIS2_BASE_URL}/api/dataValueSets.json?${params}`
            const xhr = getUploadXHR(
                url,
                upload,
                'DATAVALUE_IMPORT',
                this.clearProcessing,
                this.assertOnError,
                formattedFormat
            )

            xhr.send(upload)
        } catch (e) {
            console.log('Data Import error', e, '\n')
        }
    }
}
