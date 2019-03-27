import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { FormBase } from 'components/FormBase'
import { api } from 'services'
import {
    createBlob,
    downloadBlob,
    getFormFields,
    getFormValues,
    getDownloadUrl,
} from 'helpers'
import { MetadataDependencyExportIcon } from 'components/Icon'

export class MetaDataDependencyExport extends FormBase {
    static path = '/export/metadata-dependency'

    static order = 9
    static title = i18n.t('Metadata Dependency Export')
    static desc = i18n.t(
        'Export metadata like data sets and programs including related metadata objects.'
    )

    static menuIcon = <MetadataDependencyExportIcon />
    icon = <MetadataDependencyExportIcon />

    formWidth = 800
    formTitle = i18n.t('Metadata Export with Dependencies')
    submitLabel = i18n.t('Export')

    fields = getFormFields([
        'objectType',
        'objectList',
        'format',
        'compression',
        'sharing',
    ])

    state = getFormValues([
        'objectType',
        'objectList',
        'format:.json:json,xml',
        'compression',
        'sharing',
    ])

    async componentDidMount() {
        await this.fetch()
    }

    async fetch() {
        try {
            const objectType = this.state.objectType.selected
            const { data } = await api.get(
                `${objectType}?fields=id,displayName&paging=false`
            )
            const values = data[objectType].map(({ id, displayName }) => ({
                value: id,
                label: displayName,
            }))

            this.setState({
                objectList: {
                    values,
                    selected: values[0]['value'],
                },
            })
        } catch (e) {
            console.log('fetch Schemas failed')
            console.log(e)
        }
    }

    onFormUpdate = (name, value) => {
        if (name === 'objectType') {
            this.fetch()
        }
    }

    onSubmit = async () => {
        try {
            const {
                objectType,
                objectList,
                format,
                compression,
                sharing,
            } = this.getFormState()
            const ext = format.substr(1)

            let endpoint = `metadata`
            const url = getDownloadUrl({
                format,
                compression,
                endpoint,
                sharing,
            })
            window.location = url
        } catch (e) {
            console.log('MetaDataDependency Export error', e, '\n')
        }
    }
}
