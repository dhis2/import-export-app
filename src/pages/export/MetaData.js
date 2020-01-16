import React from 'react'
import i18n from '@dhis2/d2-i18n'

import { FormBase } from '../../components/FormBase'
import { MetadataExportIcon } from '../../components/Icon'
import { download } from '../../helpers/url'
import { getFormFields, getFormValues, getDownloadUrl } from '../../helpers'
import { isProduction } from '../../helpers/env'

export class MetaDataExport extends FormBase {
    static dataTest = 'export-metadata'
    static path = '/export/metadata'

    static order = 5
    static title = i18n.t('Metadata Export')
    static desc = i18n.t(
        'Export meta data like data elements and organisation units to the standard DHIS 2 exchange format.'
    )

    static menuIcon = <MetadataExportIcon />
    icon = <MetadataExportIcon />

    formWidth = 800
    formTitle = i18n.t('Meta Data Export')
    submitLabel = i18n.t('Export')

    fields = getFormFields(['schemas', 'format', 'compression', 'sharing'])

    state = getFormValues([
        'schemas',
        'format:.json:json,xml,csv',
        'compression',
        'sharing',
    ])

    onSubmit = async () => {
        try {
            const {
                schemas,
                format,
                compression,
                sharing,
            } = this.getFormState()

            const endpoint = `metadata`
            const downloadUrl = getDownloadUrl({
                format,
                compression,
                endpoint,
                sharing,
            })
            const schemaArgs = Object.keys(schemas)
                .filter(s => schemas[s])
                .map(name => `${name}=true`)

            const schemaParams = schemaArgs.length
                ? `&${schemaArgs.join('&')}`
                : ''

            const url = `${downloadUrl}${schemaParams}`
            download(url)
        } catch (e) {
            !isProduction && console.log('MetaData Export error', e, '\n')
        }
    }
}
