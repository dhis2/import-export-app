import React from 'react'
import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Form } from '@dhis2/ui-forms'

import {
    formatAdxOptions,
    compressionOptions,
    defaultFormatOption,
    defaultCompressionOption,
    defaultDataElementIdSchemeOption,
    defaultOrgUnitIdSchemeOption,
    defaultIdSchemeOption,
} from '../../utils/options'
import {
    OrgUnitTree,
    IncludeChildren,
    DataSetPicker,
    Format,
    Compression,
    StartDate,
    EndDate,
    IncludeDeleted,
    DataElementIdScheme,
    IdScheme,
    OrgUnitIdScheme,
    ExportButton,
    FormAlerts,
} from '../../components/Inputs'
import { Page, MoreOptions, DataIcon } from '../../components/'
import { onExport, validate } from './form-helper'

// PAGE INFO
const PAGE_NAME = i18n.t('Data export')
const PAGE_DESCRIPTION = i18n.t(
    'Export data values as ADX XML, DFX 2 XML, JSON or CSV files.'
)
const PAGE_ICON = <DataIcon />

const today = new Date()
const initialValues = {
    selectedOrgUnits: [],
    includeChildren: true,
    selectedDataSets: [],
    format: defaultFormatOption,
    compression: defaultCompressionOption,
    startDate: new Date(
        today.getFullYear(),
        today.getMonth() - 3,
        today.getDate()
    ),
    endDate: today,
    includeDeleted: false,
    dataElementIdScheme: defaultDataElementIdSchemeOption,
    orgUnitIdScheme: defaultOrgUnitIdSchemeOption,
    idScheme: defaultIdSchemeOption,
}

const DataExport = () => {
    const engine = useDataEngine()
    const onSubmit = onExport(engine)

    return (
        <Page
            title={PAGE_NAME}
            desc={PAGE_DESCRIPTION}
            icon={PAGE_ICON}
            dataTest="page-export-data"
        >
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                validate={validate}
                subscription={{ values: true, submitError: true }}
                render={({ handleSubmit, form, values, submitError }) => (
                    <form onSubmit={handleSubmit}>
                        <OrgUnitTree />
                        <IncludeChildren value={values.includeChildren} />
                        <DataSetPicker />
                        <Format availableFormats={formatAdxOptions} />
                        <Compression
                            availableCompressions={compressionOptions}
                        />
                        <StartDate />
                        <EndDate />
                        <MoreOptions>
                            <IncludeDeleted value={values.includeDeleted} />
                            <DataElementIdScheme />
                            <OrgUnitIdScheme />
                            <IdScheme />
                        </MoreOptions>
                        <ExportButton />
                        <FormAlerts alerts={submitError} />
                    </form>
                )}
            />
        </Page>
    )
}

export { DataExport }
