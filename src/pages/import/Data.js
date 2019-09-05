import { Button } from '@dhis2/ui-core'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import i18n from '@dhis2/d2-i18n'

import {
    DATA_ELEMENT_ID_SCHEME_DEFAULT_OPTIONS,
    DataElementIdScheme,
    DataElementIdSchemeLoading,
} from '../../components/Inputs/DataElementIdScheme'
import { DataIcon } from '../../components/Icon'
import { DryRun } from '../../components/Inputs/DryRun'
import { Error } from '../../components/Error'
import { FORMAT_KEY, Format, OPTION_CSV } from '../../components/Inputs/Format'
import { FirstRowIsHeader } from '../../components/Inputs/FirstRowIsHeader'
import { FormContent } from '../../components/FormSections/FormContent'
import { FormFooter } from '../../components/FormSections/FormFooter'
import { FormHeader } from '../../components/FormSections/FormHeader'
import { IdScheme } from '../../components/Inputs/idScheme'
import { MoreOptions } from '../../components/FormSections/MoreOptions'
import {
    ORG_UNIT_ID_SCHEME_DEFAULT_OPTIONS,
    OrgUnitIdScheme,
    OrgUnitIdSchemeLoading,
} from '../../components/Inputs/OrgUnitIdScheme'
import { PreheatCache } from '../../components/Inputs/PreheatCache'
import { Progress } from '../../components/Loading/Progress'
import {
    SkipAudit,
    hasAuthorityToSkipAudit,
} from '../../components/Inputs/SkipAudit'
import { SkipExistingCheck } from '../../components/Inputs/SkipExistingCheck'
import { Strategy } from '../../components/Inputs/Strategy'
import { TaskSummary } from '../../components/TaskSummary'
import { Upload } from '../../components/Inputs/Upload'
import { WithAuthority } from '../../components/WithAuthority'
import { defaultValues, supportedFormats, onSubmit } from './Data/helper'
import {
    fetchUniqueDataElementAttributes,
    fetchUniqueOrgUnitAttributes,
} from '../../reducers/attributes/thunks'
import { useErrorHandler } from '../../helpers/useErrorHandler'
import stylesForm from '../../components/Form/styles.module.css'
import stylesFormBase from '../../components/FormBase/styles.module.css'

const DataImport = ({
    loadingAttributes,
    dataElementAttributes,
    orgUnitAttributes,
    fetchDataElementAttributes,
    fetchOrganisationUnitAttributes,
}) => {
    useEffect(
        () => {
            fetchDataElementAttributes()
            fetchOrganisationUnitAttributes()
        },

        // load attributes on componentDidMount
        []
    )

    const [loading, setLoading] = useState(false)
    const [error, setError] = useErrorHandler()
    const onSubmitHandler = onSubmit(setLoading, setError)

    if (loading) return <Progress />
    if (error)
        return (
            <Error
                message={error}
                onClear={() =>
                    setError({ target: { response: { message: '' } } })
                }
            />
        )

    const dataElementIdSchemeOptions = [
        ...DATA_ELEMENT_ID_SCHEME_DEFAULT_OPTIONS,
        ...dataElementAttributes.map(({ id, displayName: label }) => ({
            value: `ATTRIBUTE:${id}`,
            label,
        })),
    ]

    const orgUnitIdSchemeOptions = [
        ...ORG_UNIT_ID_SCHEME_DEFAULT_OPTIONS,
        ...orgUnitAttributes.map(({ id, displayName: label }) => ({
            value: `ATTRIBUTE:${id}`,
            label,
        })),
    ]

    return (
        <Form onSubmit={onSubmitHandler} initialValues={defaultValues}>
            {({ handleSubmit, values }) => (
                <div className={stylesForm.wrapper}>
                    <TaskSummary />
                    <form
                        className={cx(stylesFormBase.form, stylesForm.form)}
                        onSubmit={handleSubmit}
                        style={{ width: 800 }}
                    >
                        <FormHeader
                            icon={DataImport.menuIcon}
                            label={DataImport.title}
                        />

                        <FormContent>
                            <Upload />
                            <Format options={supportedFormats} />
                            <DryRun />

                            <FirstRowIsHeader
                                show={values[FORMAT_KEY] === OPTION_CSV.value}
                            />

                            <Strategy />
                            <PreheatCache />

                            <WithAuthority check={hasAuthorityToSkipAudit}>
                                <SkipAudit />
                            </WithAuthority>

                            <MoreOptions>
                                {loadingAttributes ? (
                                    <DataElementIdSchemeLoading />
                                ) : (
                                    <DataElementIdScheme
                                        options={dataElementIdSchemeOptions}
                                    />
                                )}

                                {loadingAttributes ? (
                                    <OrgUnitIdSchemeLoading />
                                ) : (
                                    <OrgUnitIdScheme
                                        options={orgUnitIdSchemeOptions}
                                    />
                                )}

                                <IdScheme />
                                <SkipExistingCheck />
                            </MoreOptions>
                        </FormContent>

                        <FormFooter>
                            <Button primary type="submit">
                                {i18n.t('Import')}
                            </Button>
                        </FormFooter>
                    </form>
                </div>
            )}
        </Form>
    )
}

DataImport.path = '/import/data'
DataImport.title = i18n.t('Data Import')
DataImport.menuIcon = <DataIcon />
DataImport.desc = i18n.t(
    'Import data values on the DXF 2 XML, JSON, CSV and PDF formatrant s. DXF 2 is the standard exchange format for DHIS 2.'
)

const ConnectedDataImport = connect(
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
)(DataImport)

export { ConnectedDataImport as DataImport }
