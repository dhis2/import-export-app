import { connect } from 'react-redux'
import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { apiConfig } from 'config'
import { FormBase } from 'components/FormBase'
import { DataIcon } from 'components/Icon'
import {
    getFormFields,
    getFormFieldMoreOptions,
    getFormValues,
    getParamsFromFormState,
    getUploadXHR,
    values,
} from 'helpers'
import { fetchLog } from './helpers'

import {
    fetchUniqueDataElementAttributes,
    fetchUniqueOrgUnitAttributes,
} from '../../reducers/attributes/thunks'
import {
    getSharedAttributes,
    getSharedAttributesLoading,
} from '../../reducers/attributes/selectors'
import s from '../../components/Form/styles.css'

class DataImport extends FormBase {
    static path = '/import/data'

    static order = 2
    static title = i18n.t('Data Import')
    static desc = i18n.t(
        'Import data values on the DXF 2 XML, JSON, CSV and PDF formatrant s. DXF 2 is the standard exchange format for DHIS 2.'
    )

    static menuIcon = <DataIcon />
    icon = <DataIcon />

    formWidth = 700
    formTitle = i18n.t('Data Import')
    submitLabel = i18n.t('Import')

    fields = [
        ...getFormFields([
            'upload',
            'format',
            'dryRun',
            'strategy',
            'preheatCache',
        ]),

        getFormFieldMoreOptions(),

        ...getFormFields([
            'dataElementIdScheme',
            'orgUnitIdScheme',
            'idScheme',
            'skipExistingCheck',
        ]),
    ]

    state = getFormValues([
        'upload',
        'format:.json:json,xml,csv,pdf,adx',
        'dryRun',
        'strategy',
        'preheatCache',
        'dataElementIdScheme',
        'orgUnitIdScheme',
        'idScheme',
        'skipExistingCheck',
    ])

    async componentDidMount() {
        // creating default props here because componentDidUpdate
        // will not be called on initial render
        this.computeFieldOverrideValues({
            dataElementAttributes: [],
            orgUnitAttributes: [],
        })
        this.props.fetchDataElementAttributes()
        this.props.fetchOrganisationUnitAttributes()
        await fetchLog('', 'DATAVALUE_IMPORT')
    }

    componentDidUpdate(prevProps) {
        this.computeFieldOverrideValues(prevProps)
    }

    computeFieldOverrideValues(prevProps) {
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

            const idScheme = [
                ...values.idScheme.values,
                ...this.props.sharedAttributes.map(
                    ({ id, displayName: label }) => ({
                        value: `ATTRIBUTE:${id}`,
                        label,
                    })
                ),
            ]

            // Set the override values
            // These will be used by the Form copmonent
            // to build the input components
            // NOTE: this.forceUpdate() wouldn't be needed
            // if "idScheme" was hidden before clicking on "more options"
            // Due to that bug.. We have to force an update after this
            this.fieldValuesOverride = {
                dataElementIdScheme,
                orgUnitIdScheme,
                idScheme,
            }
            this.forceUpdate()
        }
    }

    onSubmit = () => {
        try {
            const { upload, format, firstRowIsHeader } = this.getFormState()
            const formattedFormat = format.substr(1)
            const append = [`format=${formattedFormat}`, 'async=true']

            if (format === '.csv') {
                append.push(`firstRowIsHeader=${firstRowIsHeader}`)
            }

            const params = getParamsFromFormState(
                this.getFormState(),
                [
                    'dataElementIdScheme',
                    'dryRun',
                    'idScheme',
                    'orgUnitIdScheme',
                    'preheatCache',
                    'skipExistingCheck',
                    'strategy',
                ],
                [`format=${format.substr(1)}`, 'async=true']
            )

            this.setProcessing()

            const url = `${apiConfig.server}/api/dataValueSets.json?${params}`
            const xhr = getUploadXHR(
                url,
                upload,
                'DATAVALUE_IMPORT',
                this.clearProcessing,
                this.assertOnError,
                formattedFormat
            )

            xhr.send(upload)
        } catch (e) {
            console.log('Data Import error', e, '\n')
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

const ConnectedDataImport = connect(
    state => ({
        loadingAttributes: getSharedAttributesLoading(state),
        dataElementAttributes: state.attributes.dataElement.data,
        orgUnitAttributes: state.attributes.organisationUnit.data,
        sharedAttributes: getSharedAttributes(state),
    }),
    dispatch => ({
        fetchDataElementAttributes: () =>
            dispatch(fetchUniqueDataElementAttributes()),
        fetchOrganisationUnitAttributes: () =>
            dispatch(fetchUniqueOrgUnitAttributes()),
    })
)(DataImport)

export { ConnectedDataImport as DataImport }
