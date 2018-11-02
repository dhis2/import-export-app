import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
import { eventEmitter } from 'services'
import { FormBase } from 'components/FormBase'
import { DataIcon } from 'components/Icon'
import { getFormField, getFormFieldMoreOptions } from 'helpers'
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
        getFormField('importFormat'),
        getFormField('dryRun'),
        getFormField('strategy'),
        getFormField('preheatCache'),

        getFormFieldMoreOptions(),

        getFormField('dataElementIdScheme'),
        getFormField('orgUnitIdScheme'),
        getFormField('idScheme'),
        getFormField('skipExistingCheck'),
    ]

    state = {
        processing: false,

        upload: {
            selected: null,
        },

        importFormat: {
            selected: 'json',
            values: [
                {
                    value: 'json',
                    label: i18n.t('JSON'),
                },
                {
                    value: 'xml',
                    label: i18n.t('XML'),
                },
                {
                    value: 'csv',
                    label: i18n.t('CSV'),
                },
                {
                    value: 'pdf',
                    label: i18n.t('PDF'),
                },
                {
                    value: 'adx',
                    label: i18n.t('ADX'),
                },
            ],
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

        strategy: {
            selected: 'NEW_AND_UPDATES',
            values: [
                {
                    value: 'NEW_AND_UPDATES',
                    label: i18n.t('New and Updates'),
                },
                {
                    value: 'NEW',
                    label: i18n.t('New only'),
                },
                {
                    value: 'UPDATES',
                    label: i18n.t('Updates only'),
                },
                {
                    value: 'DELETE',
                    label: i18n.t('Delete'),
                },
            ],
        },

        preheatCache: {
            selected: 'false',
            values: [
                {
                    value: 'false',
                    label: i18n.t('No'),
                },
                {
                    value: 'true',
                    label: i18n.t('Yes (faster for large imports)'),
                },
            ],
        },

        dataElementIdScheme: {
            selected: 'UID',
            values: [
                {
                    value: 'UID',
                    label: i18n.t('UID'),
                },
                {
                    value: 'CODE',
                    label: i18n.t('Code'),
                },
            ],
        },

        orgUnitIdScheme: {
            selected: 'UID',
            values: [
                {
                    value: 'UID',
                    label: i18n.t('UID'),
                },
                {
                    value: 'CODE',
                    label: i18n.t('Code'),
                },
                {
                    value: 'NAME',
                    label: i18n.t('Name'),
                },
                {
                    value: 'ATTRIBUTE:UKNKz1H10EE',
                    label: i18n.t('HR identifier'),
                },
            ],
        },

        idScheme: {
            selected: 'UID',
            values: [
                {
                    value: 'UID',
                    label: i18n.t('UID'),
                },
                {
                    value: 'CODE',
                    label: i18n.t('Code'),
                },
            ],
        },

        skipExistingCheck: {
            selected: 'false',
            values: [
                {
                    value: 'false',
                    label: i18n.t('Check (safe, recommended)'),
                },
                {
                    value: 'true',
                    label: i18n.t('Skip check (fast)'),
                },
            ],
        },
    }

    async componentDidMount() {
        await fetchLog('', 'DATAVALUE_IMPORT')
    }

    onSubmit = () => {
        try {
            const {
                upload,
                importFormat,
                dryRun,
                strategy,
                preheatCache,
                dataElementIdScheme,
                orgUnitIdScheme,
                idScheme,
                skipExistingCheck,
            } = this.getFormState()

            const formData = new FormData()
            formData.set('upload', upload)

            const params = []
            params.push(`importFormat=${importFormat}`)
            params.push(`dryRun=${dryRun}`)
            params.push(`strategy=${strategy}`)
            params.push(`preheatCache=${preheatCache}`)
            params.push(`dataElementIdScheme=${dataElementIdScheme}`)
            params.push(`orgUnitIdScheme=${orgUnitIdScheme}`)
            params.push(`idScheme=${idScheme}`)
            params.push(`skipExistingCheck=${skipExistingCheck}`)
            params.push('async=true')

            const contentType = getMimeType(upload.name)

            this.setState({ processing: true })

            const xhr = new XMLHttpRequest()
            xhr.withCredentials = true
            xhr.open(
                'POST',
                `${apiConfig.server}/api/dataValueSets.json?${params.join(
                    '&'
                )}`,
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
