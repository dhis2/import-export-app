import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import JSZip from 'jszip'
import { getInstance } from 'd2/lib/d2'
import { FormBase } from 'components/FormBase'
import moment from 'moment'
import { apiConfig } from 'config'
import {
    today,
    downloadBlob,
    createBlob,
    getFormField,
    getFormFieldMoreOptions,
} from 'helpers'
import { DataIcon } from 'components/Icon'

export class DataExport extends FormBase {
    static path = '/export/data'

    static order = 7
    static title = i18n.t('Data Export')
    static menuIcon = <DataIcon />
    icon = <DataIcon />

    static contextTypes = {
        d2: PropTypes.object,
    }

    formWidth = 600
    formTitle = i18n.t('Data Export')
    submitLabel = i18n.t('Export')

    fields = [
        getFormField('orgUnit'),
        getFormField('selectedDataSets'),
        getFormField('startDate'),
        getFormField('endDate'),
        getFormField('exportFormat'),
        getFormField('compression'),

        getFormFieldMoreOptions(),

        getFormField('includeDeleted'),
        getFormField('dataElementIdScheme'),
        getFormField('orgUnitIdScheme'),
        getFormField('categoryOptionComboIdScheme'),
    ]

    state = {
        processing: false,
        orgUnit: {
            selected: [],
            value: null,
        },
        selectedDataSets: {
            selected: [],
            value: null,
        },
        startDate: {
            selected: today(),
        },
        endDate: {
            selected: today(),
        },
        exportFormat: {
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
            ],
        },
        compression: {
            selected: 'zip',
            values: [
                {
                    value: 'zip',
                    label: i18n.t('Zip'),
                },
                {
                    value: 'none',
                    label: 'Uncompressed',
                },
            ],
        },
        includeDeleted: {
            selected: 'false',
            values: [
                {
                    value: 'true',
                    label: i18n.t('Yes'),
                },
                {
                    value: 'false',
                    label: i18n.t('No'),
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
                {
                    value: 'NAME',
                    label: i18n.t('Name'),
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
        categoryOptionComboIdScheme: {
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
    }

    async componentDidMount() {
        await this.fetch()
    }

    async fetch() {
        try {
            const d2 = await getInstance()
            const dataSets = await d2.models.dataSet
                .list({ paging: false, fields: 'id,displayName' })
                .then(collection => collection.toArray())
                .then(sets =>
                    sets.map(dataSet => ({
                        value: dataSet.id,
                        label: dataSet.displayName,
                    }))
                )
            this.setState({
                selectedDataSets: {
                    selected: [],
                    value: dataSets,
                },
            })
        } catch (e) {
            console.log(e)
        }
    }

    onSubmit = async () => {
        try {
            const {
                orgUnit,
                startDate,
                endDate,
                exportFormat,
                compression,
                dataElementIdScheme,
                orgUnitIdScheme,
                categoryOptionComboIdScheme,
                selectedDataSets,
                includeDeleted,
            } = this.getFormState()

            if (orgUnit.length === 0 || selectedDataSets.length === 0) {
                return
            }

            const params = []
            params.push(`startDate=${moment(startDate).format('YYYY-MM-DD')}`)
            params.push(`endDate=${moment(endDate).format('YYYY-MM-DD')}`)
            params.push(`dataElementIdScheme=${dataElementIdScheme}`)
            params.push(`orgUnitIdScheme=${orgUnitIdScheme}`)
            params.push(`includeDeleted=${includeDeleted}`)
            params.push(
                `categoryOptionComboIdScheme=${categoryOptionComboIdScheme}`
            )

            orgUnit.forEach(v => {
                params.push(`orgUnit=${v.substr(v.lastIndexOf('/') + 1)}`)
            })

            selectedDataSets.forEach(v => {
                params.push(`dataSet=${v}`)
            })

            this.setState({ processing: true })

            let extension = `.${exportFormat}`
            // if (compression !== 'none') {
            //   extension += `.${compression}`
            // }

            const xhr = new XMLHttpRequest()
            xhr.withCredentials = true
            xhr.open(
                'GET',
                `${
                    apiConfig.server
                }/api/dataValueSets${extension}?${params.join('&')}`,
                true
            )
            xhr.onreadystatechange = async () => {
                if (
                    xhr.readyState === 4 &&
                    Math.floor(xhr.status / 100) === 2
                ) {
                    this.setState({ processing: false })

                    let filename = `data.${exportFormat}`
                    if (compression !== 'none') {
                        const zip = new JSZip()
                        zip.file(filename, xhr.responseText)
                        zip.generateAsync({ type: 'blob' }).then(content => {
                            const url = URL.createObjectURL(content)
                            downloadBlob(url, `${filename}.${compression}`)
                        })
                    } else {
                        const url = createBlob(
                            xhr.responseText,
                            exportFormat,
                            compression
                        )
                        downloadBlob(url, filename)
                    }
                }
            }
            xhr.send()
        } catch (e) {
            console.log('Data Export error', e, '\n')
        }
    }
}
