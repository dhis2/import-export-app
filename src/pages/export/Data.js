import { connect } from 'react-redux'
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
    getFormFields,
    getFormFieldMoreOptions,
    getFormValues,
    getParamsFromFormState,
    values,
} from 'helpers'
import { DataIcon } from 'components/Icon'
import {
    fetchUniqueDataElementAttributes,
    fetchUniqueOrgUnitAttributes,
} from '../../reducers/attributes/thunks'
import s from '../../components/Form/styles.css'

class DataExport extends FormBase {
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
        this.props.fetchDataElementAttributes()
        this.props.fetchOrganisationUnitAttributes()
        await this.fetch()
    }

    componentDidUpdate(prevProps) {
        // Only set field overrides if the amount of elements changed in the store
        // These values will be loaded on page load only anyways
        if (
            prevProps.dataElementAttributes.length !==
                this.props.dataElementAttributes.length ||
            prevProps.orgUnitAttributes.length !==
                this.props.orgUnitAttributes.length
        ) {
            // Collect default form options and add dynamic ones
            const dataElementIdScheme = [
                ...values.dataElementIdScheme.values,
                ...this.props.dataElementAttributes.map(
                    ({ id, displayName: label }) => ({
                        value: `ATTRIBUTE:${id}`,
                        label,
                    })
                ),
            ]

            const orgUnitIdScheme = [
                ...values.orgUnitIdScheme.values,
                ...this.props.orgUnitAttributes.map(
                    ({ id, displayName: label }) => ({
                        value: `ATTRIBUTE:${id}`,
                        label,
                    })
                ),
            ]

            // Set the override values
            // These will be used by the Form copmonent
            // to build the input components
            this.fieldValuesOverride = {
                dataElementIdScheme,
                orgUnitIdScheme,
            }
        }
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
  
    render() {
        const form = super.render()

        if (this.props.loadingAttributes) {
            return (
                <div className={s.wrapper}>
                    <div
                        className={s.form}
                        style={{
                            padding: '14px 20px',
                            width: 800,
                            boxSizing: 'border-box',
                            margin: '60px auto',
                        }}
                    >
                        {i18n.t('Loading options...')}
                    </div>
                </div>
            )
        }

        return form
    }
}

const ConnectedDataExport = connect(
    state => ({
        loadingAttributes: state.attributes.loading,
        dataElementAttributes: state.attributes.dataElement,
        orgUnitAttributes: state.attributes.organisationUnit,
    }),
    dispatch => ({
        fetchDataElementAttributes: () =>
            dispatch(fetchUniqueDataElementAttributes()),
        fetchOrganisationUnitAttributes: () =>
            dispatch(fetchUniqueOrgUnitAttributes()),
    })
)(DataExport)

export { ConnectedDataExport as DataExport }
