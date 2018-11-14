import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { api } from 'services'
import { createBlob, downloadBlob, getFormField, getFormValues } from 'helpers'
import { FormBase } from 'components/FormBase'
import { MetadataExportIcon } from 'components/Icon'

export class MetaDataExport extends FormBase {
    static path = '/export/metadata'

    static order = 5
    static title = i18n.t('Metadata Export')
    static menuIcon = <MetadataExportIcon />
    icon = <MetadataExportIcon />

    formWidth = '85%'
    formTitle = i18n.t('Meta Data Export')
    submitLabel = i18n.t('Export')

    fields = [
        getFormField('schemas'),
        getFormField('format'),
        getFormField('compression'),
        getFormField('sharing'),
    ]

    state = getFormValues([
        'schemas',
        'format:.json:json,xml',
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

            const ext = format.substr(1)

            const params = []
            params.push('assumeTrue=false')
            params.push(`format=${ext}`)
            params.push(
                schemas
                    .map(name => name)
                    .sort()
                    .map(name => `${name}=true`)
                    .join('&')
            )

            if (sharing !== 'true') {
                params.push(
                    'fields=:owner,!user,!publicAccess,!userGroupAccesses'
                )
                params.push('skipSharing=true')
            }

            let endpoint = `metadata${format}`
            if (compression !== 'none') {
                endpoint += compression
                window.location = api.url(`${endpoint}?${params.join('&')}`)
                return
            }

            this.setState({ processing: true }, async () => {
                const { data } = await api.get(
                    `${endpoint}?${params.join('&')}`
                )
                let contents = data
                if (ext === 'json') {
                    contents = JSON.stringify(data)
                }

                downloadBlob(createBlob(contents, ext), endpoint)
                this.setState({ processing: false })
            })
        } catch (e) {
            console.log('MetaData Export error', e, '\n')
        }
    }
}
