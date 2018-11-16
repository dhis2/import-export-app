import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
import { FormBase } from 'components/FormBase'
import { GMLIcon } from 'components/Icon'
import { getFormField, getFormValues, getUploadXHR } from 'helpers'
import { fetchLog } from './helpers'

export class GMLImport extends FormBase {
    static path = '/import/gml'

    static order = 4
    static title = i18n.t('GML Import')
    static desc = i18n.t(
        'Import geographic data for organisation units using GML format. GML is an XML grammar for expressing geographical features.'
    )

    static menuIcon = <GMLIcon />
    icon = <GMLIcon />

    formWidth = 600
    formTitle = i18n.t('GML Import')
    formDescription = i18n.t(
        'Only import of GML data for existing organisation units is supported.'
    )
    submitLabel = i18n.t('Import')

    fields = [getFormField('upload'), getFormField('dryRun')]
    state = getFormValues(['upload', 'dryRun'])

    async componentDidMount() {
        await fetchLog('', 'GML_IMPORT')
    }

    onSubmit = async () => {
        try {
            const { upload, dryRun } = this.getFormState()

            const formData = new FormData()
            formData.set('upload', upload)

            this.setProcessing()

            const params = `dryRun=${dryRun}`
            const url = `${apiConfig.server}/api/metadata/gml.json?${params}`
            const xhr = getUploadXHR(
                url,
                upload,
                'GML_IMPORT',
                this.clearProcessing,
                this.assertOnError
            )
            xhr.send(upload)
        } catch (e) {
            console.log('GML Import error', e, '\n')
        }
    }
}
