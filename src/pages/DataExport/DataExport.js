import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm } from '@dhis2/ui'
import React, { useState } from 'react'
import {
    Page,
    MoreOptions,
    BasicOptions,
    SchemeContainer,
    DataIcon,
    ValidationSummary,
} from '../../components/index.js'
import {
    OrgUnitTree,
    IncludeChildren,
    DataSetPicker,
    Format,
    formatAdxXMLOptions,
    defaultFormatOption,
    Compression,
    defaultCompressionOption,
    Dates,
    StartDate,
    EndDate,
    IncludeDeleted,
    DataElementIdScheme,
    defaultDataElementIdSchemeOption,
    IdScheme,
    defaultIdSchemeOption,
    OrgUnitIdScheme,
    defaultOrgUnitIdSchemeOption,
    ExportButton,
    FormAlerts,
} from '../../components/Inputs/index.js'
import { jsDateToISO8601 } from '../../utils/helper.js'
import { onExport, validate } from './form-helper.js'

const { Form } = ReactFinalForm

// PAGE INFO
export const PAGE_NAME = i18n.t('Data export')
export const PAGE_DESCRIPTION = i18n.t(
    'Export metadata, such as data elements and organisation units, to JSON, CSV, DXF 2 XML, or ADX XML format.'
)
const PAGE_ICON = <DataIcon />

const today = new Date()
const threeMonthsBeforeToday = new Date(
    today.getFullYear(),
    today.getMonth() - 3,
    today.getDate()
)

const initialValues = {
    selectedOrgUnits: [],
    includeChildren: true,
    selectedDataSets: [],
    format: defaultFormatOption,
    compression: defaultCompressionOption,
    startDate: jsDateToISO8601(threeMonthsBeforeToday),
    endDate: jsDateToISO8601(today),
    includeDeleted: false,
    dataElementIdScheme: defaultDataElementIdSchemeOption,
    orgUnitIdScheme: defaultOrgUnitIdSchemeOption,
    idScheme: defaultIdSchemeOption,
}

const DataExport = () => {
    const [exportEnabled, setExportEnabled] = useState(true)
    const { baseUrl } = useConfig()
    const onSubmit = onExport(baseUrl, setExportEnabled)

    return (
        <Page
            title={PAGE_NAME}
            desc={PAGE_DESCRIPTION}
            icon={PAGE_ICON}
            loading={!exportEnabled}
            dataTest="page-export-data"
        >
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                validate={validate}
                subscription={{
                    values: true,
                    submitError: true,
                }}
                render={({ handleSubmit, submitError }) => (
                    <form onSubmit={handleSubmit}>
                        <BasicOptions>
                            <OrgUnitTree />
                            <IncludeChildren />
                            <DataSetPicker />
                            <Dates
                                label={i18n.t('Date range to export data for')}
                            >
                                <StartDate />
                                <EndDate />
                            </Dates>
                            <Format availableFormats={formatAdxXMLOptions} />
                            <Compression />
                        </BasicOptions>
                        <MoreOptions>
                            <IncludeDeleted />
                            <SchemeContainer>
                                <DataElementIdScheme />
                                <OrgUnitIdScheme />
                                <IdScheme />
                            </SchemeContainer>
                        </MoreOptions>
                        <ValidationSummary />
                        <ExportButton
                            label={i18n.t('Export data')}
                            disabled={!exportEnabled}
                        />
                        <FormAlerts alerts={submitError} />
                    </form>
                )}
            />
        </Page>
    )
}

export { DataExport }
