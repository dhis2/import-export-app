import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
import { api, eventEmitter } from 'services'
import { FormBase } from 'components/FormBase'
import { CTX_DEFAULT, CTX_CSV_OPTION } from 'components/Form'
import { MetadataImportIcon } from 'components/Icon'
import {
    getFormFields,
    getFormFieldMoreOptions,
    getFormValues,
    getUploadXHR,
    getParamsFromFormState,
} from 'helpers'
import { fetchLog } from './helpers'

export class MetaDataImport extends FormBase {
    static dataTest = 'import-metadata'
    static path = '/import/metadata'

    static order = 1
    static title = i18n.t('Metadata Import')
    static desc = i18n.t(
        'Import metadata like data elements and organisation units using the standard DHIS 2 exchange format called DXF 2.'
    )

    static menuIcon = <MetadataImportIcon />
    icon = <MetadataImportIcon />

    formWidth = 800
    formTitle = i18n.t('Metadata Import')
    submitLabel = i18n.t('Import')

    fields = [
        ...getFormFields([
            'upload',
            'format',
            'importMode',
            'classKey',
            'identifier',
            'importReportMode',
            'preheatMode',
            'importStrategy',
            'atomicMode',
            'mergeMode',
        ]),

        getFormFieldMoreOptions(),

        ...getFormFields([
            'flushMode',
            'skipSharing',
            'skipValidation',
            'async',
            'inclusionStrategy',
        ]),
    ]

    state = getFormValues([
        '_context',
        'upload',
        'format:.json:json,xml,csv',
        'dryRun',
        'classKey',
        'importMode',
        'identifier',
        'importReportMode',
        'preheatMode',
        'importStrategy',
        'atomicMode',
        'mergeMode',
        'flushMode',
        'skipSharing',
        'skipValidation',
        'async',
        'inclusionStrategy',
    ])

    async componentDidMount() {
        await fetchLog('', 'METADATA_IMPORT')
        eventEmitter.emit('summary.clear')
        await this.fetch()
    }

    async fetch() {
        try {
            const { data } = await api.get('metadata/csvImportClasses')
            const values = data.map(v => ({
                value: v,
                label: v.split('_').join(' '),
            }))

            this.setState({
                classKey: {
                    values,
                    selected: values[0]['value'],
                },
            })
        } catch (e) {
            console.log('fetch csvImportClasses failed')
            console.log(e)
        }
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

    onSubmit = async () => {
        try {
            const { upload, format, classKey } = this.getFormState()
            const formData = new FormData()
            formData.set('upload', upload)

            const append = format === '.csv' ? [`classKey=${classKey}`] : []
            append.push(`format=${format.slice(1)}`)

            const params = getParamsFromFormState(
                this.getFormState(),
                [
                    'importMode',
                    'identifier',
                    'importReportMode',
                    'preheatMode',
                    'importStrategy',
                    'atomicMode',
                    'mergeMode',
                    'flushMode',
                    'skipSharing',
                    'skipValidation',
                    'async',
                    'inclusionStrategy',
                ],
                append
            )

            this.setProcessing()

            const url = `${apiConfig.server}/api/metadata.json?${params}`
            const xhr = getUploadXHR(
                url,
                upload,
                'METADATA_IMPORT',
                this.clearProcessing,
                this.assertOnError,
                format.substr(1)
            )
            xhr.send(upload)
        } catch (e) {
            console.log('MetaData Import error', e, '\n')
        } finally {
        }
    }
}