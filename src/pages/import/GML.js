import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
import { eventEmitter } from 'services'
import { FormBase } from 'components/FormBase'
import { CTX_DEFAULT, TYPE_FILE, TYPE_RADIO } from 'components/Form'
import { GMLIcon } from 'components/Icon'
import { emitLogOnFirstResponse, fetchLog, getMimeType } from './helpers'

export class GMLImport extends FormBase {
    static path = '/import/gml'

    static order = 4
    static title = i18n.t('GML Import')
    static menuIcon = <GMLIcon />
    icon = <GMLIcon />

    formWidth = 600
    formTitle = i18n.t('GML Import')
    formDescription = i18n.t(
        'Only import of GML data for existing organisation units is supported.'
    )
    submitLabel = i18n.t('Import')

    fields = [
        {
            context: CTX_DEFAULT,
            type: TYPE_FILE,
            name: 'upload',
            label: null,
        },
        {
            context: CTX_DEFAULT,
            type: TYPE_RADIO,
            name: 'dryRun',
            label: i18n.t('Dry run'),
        },
    ]

    state = {
        processing: false,

        upload: {
            selected: null,
        },

        dryRun: {
            selected: 'false',
            values: [
                {
                    value: 'false',
                    label: i18n.t('No'),
                },
                {
                    value: 'true',
                    label: i18n.t('Yes'),
                },
            ],
        },
    }

    async componentDidMount() {
        await fetchLog('', 'GML_IMPORT')
    }

    onSubmit = async () => {
        try {
            const { upload, dryRun } = this.getFormState()

            const formData = new FormData()
            formData.set('upload', upload)

            const contentType = getMimeType(upload.name)

            const params = []
            params.push(`dryRun=${dryRun}`)

            this.setState({ processing: true })

            const xhr = new XMLHttpRequest()
            xhr.withCredentials = true
            xhr.open(
                'POST',
                `${apiConfig.server}/api/metadata/gml.json?${params.join('&')}`,
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

                    const jobId = emitLogOnFirstResponse(xhr, 'GML_IMPORT')
                    this.setState({ processing: false })
                    await fetchLog(jobId, 'GML_IMPORT')
                } else if ([3, 4, 5].includes(status)) {
                    this.assertOnError(e)
                }
            }
            xhr.send(upload)
        } catch (e) {
            console.log('GML Import error', e, '\n')
        }
    }
}
