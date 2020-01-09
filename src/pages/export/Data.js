import { Button } from '@dhis2/ui-core'
import { Form } from 'react-final-form'
import React, { useState } from 'react'
import cx from 'classnames'
import i18n from '@dhis2/d2-i18n'

import { Children } from '../../components/Inputs/Children'
import { Compression } from '../../components/Inputs/Compression'
import { DataElementIdScheme } from '../../components/Inputs/DataElementIdScheme'
import { DataIcon } from '../../components/Icon'
import { DataSets } from '../../components/Inputs/DataSets'
import { EndDate } from '../../components/Inputs/EndDate'
import { Error } from '../../components/Error'
import { FormContent } from '../../components/FormSections/FormContent'
import { FormFooter } from '../../components/FormSections/FormFooter'
import { FormHeader } from '../../components/FormSections/FormHeader'
import { Format } from '../../components/Inputs/Format'
import { IdScheme } from '../../components/Inputs/idScheme'
import { IncludeDeleted } from '../../components/Inputs/IncludeDeleted'
import { MoreOptions } from '../../components/FormSections/MoreOptions'
import { OrgUnit } from '../../components/Inputs/OrgUnit'
import { OrgUnitIdScheme } from '../../components/Inputs/OrgUnitIdScheme'
import { Progress } from '../../components/Loading'
import { StartDate } from '../../components/Inputs/StartDate'
import { supportedFormats, initialValues, onSubmit } from './Data/helper'
import { useErrorHandler } from '../../helpers/useErrorHandler'
import formBaseStyles from '../../components/FormBase/styles.module.css'
import formStyles from '../../components/Form/styles.module.css'

export const DataExport = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useErrorHandler()

    if (loading) return <Progress />
    if (error)
        return (
            <Error
                message={error}
                onClear={() =>
                    setError({
                        target: {
                            response: {
                                message: '',
                            },
                        },
                    })
                }
            />
        )

    return (
        <Form
            onSubmit={onSubmit(setLoading, setError)}
            initialValues={initialValues}
        >
            {({ handleSubmit, values }) => (
                <div className={formStyles.wrapper}>
                    <form
                        className={cx(formBaseStyles.form, formStyles.form)}
                        onSubmit={handleSubmit}
                        style={{ width: 800 }}
                    >
                        <FormHeader
                            icon={DataExport.menuIcon}
                            label={DataExport.title}
                        />

                        <FormContent>
                            <OrgUnit />
                            <Children />
                            <DataSets />
                            <StartDate />
                            <EndDate />
                            <Format options={supportedFormats} />
                            <Compression />

                            <MoreOptions>
                                <IncludeDeleted />
                                <DataElementIdScheme />
                                <OrgUnitIdScheme />
                                <IdScheme />
                            </MoreOptions>
                        </FormContent>

                        <FormFooter>
                            <Button primary type="submit">
                                {i18n.t('Export')}
                            </Button>
                        </FormFooter>
                    </form>
                </div>
            )}
        </Form>
    )
}

DataExport.dataTest = 'export-data'
DataExport.path = '/export/data'
DataExport.menuIcon = <DataIcon />
DataExport.order = 7
DataExport.title = i18n.t('Data Export')
DataExport.desc = i18n.t(
    'Export data values. This is the regular export function which exports data to the DHIS 2 exchange format called DXF 2.'
)

//class _DataExport extends FormBase {
//    static dataTest = 'export-data'
//    static path = '/export/data'
//
//    static order = 7
//    static title = i18n.t('Data Export')
//    static desc = i18n.t(
//        'Export data values. This is the regular export function which exports data to the DHIS 2 exchange format called DXF 2.'
//    )
//
//    static menuIcon = <DataIcon />
//    icon = <DataIcon />
//
//    static contextTypes = {
//        d2: PropTypes.object,
//    }
//
//    formWidth = 800
//    formTitle = i18n.t('Data Export')
//    submitLabel = i18n.t('Export')
//    fields = [
//        ...getFormFields([
//            'orgUnit',
//            'children',
//            'selectedDataSets',
//            'startDate',
//            'endDate',
//            'format',
//            'compression',
//        ]),
//
//        getFormFieldMoreOptions(),
//
//        ...getFormFields([
//            'includeDeleted',
//            'dataElementIdScheme',
//            'orgUnitIdScheme',
//            'idScheme',
//        ]),
//    ]
//    state = getFormValues([
//        'orgUnit',
//        'children',
//        'selectedDataSets',
//        'startDate',
//        'endDate',
//        'format:.json:json,xml,csv',
//        'compression',
//        'includeDeleted',
//        'dataElementIdScheme',
//        'orgUnitIdScheme',
//        'idScheme',
//    ])
//
//    async componentDidMount() {
//        // creating default props here because componentDidUpdate
//        // will not be called on initial render
//        this.computeFieldOverrideValues({
//            dataElementAttributes: [],
//            orgUnitAttributes: [],
//        })
//        this.props.fetchDataElementAttributes()
//        this.props.fetchOrganisationUnitAttributes()
//        await this.fetch()
//    }
//
//    componentDidUpdate(prevProps) {
//        this.computeFieldOverrideValues(prevProps)
//    }
//
//    computeFieldOverrideValues(prevProps) {
//        // Only set field overrides if the amount of elements changed in the store
//        // These values will be loaded on page load only anyways
//        if (
//            prevProps.dataElementAttributes.length !==
//                this.props.dataElementAttributes.length ||
//            prevProps.orgUnitAttributes.length !==
//                this.props.orgUnitAttributes.length
//        ) {
//            // Collect default form options and add dynamic ones
//            const dataElementIdScheme = [
//                ...values.dataElementIdScheme.values,
//                ...this.props.dataElementAttributes.map(
//                    ({ id, displayName: label }) => ({
//                        value: `ATTRIBUTE:${id}`,
//                        label,
//                    })
//                ),
//            ]
//
//            const orgUnitIdScheme = [
//                ...values.orgUnitIdScheme.values,
//                ...this.props.orgUnitAttributes.map(
//                    ({ id, displayName: label }) => ({
//                        value: `ATTRIBUTE:${id}`,
//                        label,
//                    })
//                ),
//            ]
//
//            const idScheme = [
//                ...values.idScheme.values,
//                ...this.props.sharedAttributes.map(
//                    ({ id, displayName: label }) => ({
//                        value: `ATTRIBUTE:${id}`,
//                        label,
//                    })
//                ),
//            ]
//
//            // Set the override values
//            // These will be used by the Form copmonent
//            // to build the input components
//            // NOTE: this.forceUpdate() wouldn't be needed
//            // if "idScheme" was hidden before clicking on "more options"
//            // Due to that bug.. We have to force an update after this
//            this.fieldValuesOverride = {
//                dataElementIdScheme,
//                orgUnitIdScheme,
//                idScheme,
//            }
//            this.forceUpdate()
//        }
//    }
//
//    async fetch() {
//        try {
//            const d2 = await getInstance()
//            const dataSets = await d2.models.dataSet
//                .list({ paging: false, fields: 'id,displayName' })
//                .then(collection => collection.toArray())
//                .then(sets =>
//                    sets.map(dataSet => ({
//                        value: dataSet.id,
//                        label: dataSet.displayName,
//                    }))
//                )
//            this.setState({
//                selectedDataSets: {
//                    selected: [],
//                    value: dataSets,
//                },
//            })
//        } catch (e) {
//            !isProduction && console.log(e)
//        }
//    }
//
//    onSubmit = async () => {
//        try {
//            const {
//                orgUnit,
//                startDate,
//                endDate,
//                format,
//                compression,
//                selectedDataSets,
//            } = this.getFormState()
//
//            if (orgUnit.length === 0 || selectedDataSets.length === 0) {
//                return
//            }
//
//            const append = []
//            append.push(`startDate=${moment(startDate).format('YYYY-MM-DD')}`)
//            append.push(`endDate=${moment(endDate).format('YYYY-MM-DD')}`)
//
//            orgUnit.forEach(v => {
//                append.push(`orgUnit=${v.substr(v.lastIndexOf('/') + 1)}`)
//            })
//
//            selectedDataSets.forEach(v => {
//                append.push(`dataSet=${v}`)
//            })
//
//            const params = getParamsFromFormState(
//                this.getFormState(),
//                [
//                    'dataElementIdScheme',
//                    'orgUnitIdScheme',
//                    'includeDeleted',
//                    'children',
//                    'idScheme',
//                ],
//                append
//            )
//
//            this.setProcessing()
//
//            const xhr = new XMLHttpRequest()
//            const { REACT_APP_DHIS2_BASE_URL } = process.env
//
//            xhr.withCredentials = true
//            xhr.open(
//                'GET',
//                `${REACT_APP_DHIS2_BASE_URL}/api/dataValueSets${format}?${params}`,
//                true
//            )
//            xhr.onreadystatechange = async () => {
//                if (
//                    xhr.readyState === 4 &&
//                    Math.floor(xhr.status / 100) === 2
//                ) {
//                    this.clearProcessing()
//
//                    const filename = `data${format}`
//                    if (compression !== 'none') {
//                        const zip = new JSZip()
//                        zip.file(filename, xhr.responseText)
//                        zip.generateAsync({ type: 'blob' }).then(content => {
//                            const url = URL.createObjectURL(content)
//                            downloadBlob(url, `${filename}${compression}`)
//                        })
//                    } else {
//                        const url = createBlob(
//                            xhr.responseText,
//                            format.substr(1)
//                        )
//                        downloadBlob(url, filename)
//                    }
//                }
//            }
//            xhr.send()
//        } catch (e) {
//            !isProduction && console.log('Data Export error', e, '\n')
//        }
//    }
//
//    render() {
//        const form = super.render()
//
//        if (this.props.loadingAttributes) {
//            return (
//                <div className={s.wrapper}>
//                    <div
//                        className={s.form}
//                        style={{
//                            padding: '14px 20px',
//                            width: 800,
//                            boxSizing: 'border-box',
//                            margin: '60px auto',
//                        }}
//                    >
//                        {i18n.t('Loading options...')}
//                    </div>
//                </div>
//            )
//        }
//
//        return form
//    }
//}
