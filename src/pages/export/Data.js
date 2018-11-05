import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import JSZip from 'jszip'
import { getInstance } from 'd2/lib/d2'
import { FormBase } from 'components/FormBase'
import moment from 'moment'
import { apiConfig } from 'config'
import {
    downloadBlob,
    createBlob,
    getFormField,
    getFormFieldMoreOptions,
    getFormValues,
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
        getFormField('format'),
        getFormField('compression'),

        getFormFieldMoreOptions(),

        getFormField('includeDeleted'),
        getFormField('dataElementIdScheme'),
        getFormField('orgUnitIdScheme'),
        getFormField('categoryOptionComboIdScheme'),
    ]

    state = getFormValues([
        'orgUnit',
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

            const xhr = new XMLHttpRequest()
            xhr.withCredentials = true
            xhr.open(
                'GET',
                `${apiConfig.server}/api/dataValueSets${format}?${params.join(
                    '&'
                )}`,
                true
            )
            xhr.onreadystatechange = async () => {
                if (
                    xhr.readyState === 4 &&
                    Math.floor(xhr.status / 100) === 2
                ) {
                    this.setState({ processing: false })

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
