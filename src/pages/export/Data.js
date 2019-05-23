import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import JSZip from 'jszip'
import { getInstance } from 'd2/lib/d2'
import moment from 'moment'
import { FormBase } from '../../components/FormBase'
import { apiConfig } from '../../config'
import {
    downloadBlob,
    createBlob,
    getFormFields,
    getFormFieldMoreOptions,
    getFormValues,
    getParamsFromFormState,
} from '../../helpers'
import { DataIcon } from '../../components/Icon'

export class DataExport extends FormBase {
    static path = '/export/data'

    static order = 7
    static title = i18n.t('Data Export')
    static desc = i18n.t(
        'Export data values. This is the regular export function which exports data to the DHIS 2 exchange format called DXF 2.'
    )

    static menuIcon = <DataIcon />
    icon = <DataIcon />

    static contextTypes = {
        d2: PropTypes.object,
    }

    formWidth = 800
    formTitle = i18n.t('Data Export')
    submitLabel = i18n.t('Export')

    fields = [
        ...getFormFields([
            'orgUnit',
            'children',
            'selectedDataSets',
            'startDate',
            'endDate',
            'format',
            'compression',
        ]),

        getFormFieldMoreOptions(),

        ...getFormFields([
            'includeDeleted',
            'dataElementIdScheme',
            'orgUnitIdScheme',
            'categoryOptionComboIdScheme',
        ]),
    ]

    state = getFormValues([
        'orgUnit',
        'children',
        'selectedDataSets',
        'startDate',
        'endDate',
        'format:.json:json,xml,csv',
        'compression',
        'includeDeleted',
        'dataElementIdScheme',
        'orgUnitIdScheme',
        'categoryOptionComboIdScheme',
    ])

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
                format,
                compression,
                selectedDataSets,
            } = this.getFormState()

            if (orgUnit.length === 0 || selectedDataSets.length === 0) {
                return
            }

            const append = []
            append.push(`startDate=${moment(startDate).format('YYYY-MM-DD')}`)
            append.push(`endDate=${moment(endDate).format('YYYY-MM-DD')}`)

            orgUnit.forEach(v => {
                append.push(`orgUnit=${v.substr(v.lastIndexOf('/') + 1)}`)
            })

            selectedDataSets.forEach(v => {
                append.push(`dataSet=${v}`)
            })

            const params = getParamsFromFormState(
                this.getFormState(),
                [
                    'dataElementIdScheme',
                    'orgUnitIdScheme',
                    'includeDeleted',
                    'children',
                    'categoryOptionComboIdScheme',
                ],
                append
            )

            this.setProcessing()

            const xhr = new XMLHttpRequest()
            xhr.withCredentials = true
            xhr.open(
                'GET',
                `${apiConfig.server}/api/dataValueSets${format}?${params}`,
                true
            )
            xhr.onreadystatechange = async () => {
                if (
                    xhr.readyState === 4 &&
                    Math.floor(xhr.status / 100) === 2
                ) {
                    this.clearProcessing()

                    let filename = `data${format}`
                    if (compression !== 'none') {
                        const zip = new JSZip()
                        zip.file(filename, xhr.responseText)
                        zip.generateAsync({ type: 'blob' }).then(content => {
                            const url = URL.createObjectURL(content)
                            downloadBlob(url, `${filename}${compression}`)
                        })
                    } else {
                        const url = createBlob(
                            xhr.responseText,
                            format.substr(1)
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
