import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm } from '@dhis2/ui'
import React, { useState } from 'react'
import {
    Page,
    MoreOptions,
    BasicOptions,
    SchemeContainer,
    EventIcon,
    ValidationSummary,
} from '../../components/index.js'
import {
    OrgUnitTree,
    ProgramPicker,
    Format,
    defaultFormatOption,
    Compression,
    defaultCompressionOption,
    Dates,
    StartDate,
    EndDate,
    IncludeDeleted,
    Inclusion,
    defaultInclusionOption,
    ExportButton,
    ProgramStages,
    DataElementIdScheme,
    defaultDataElementIdSchemeOption,
    OrgUnitIdScheme,
    defaultOrgUnitIdSchemeOption,
    IdScheme,
    defaultIdSchemeOption,
    formatNoXmlOptions,
} from '../../components/Inputs/index.js'
import { jsDateToISO8601 } from '../../utils/helper.js'
import { onExport, validate } from './form-helper.js'

const { Form } = ReactFinalForm

// PAGE INFO
export const PAGE_NAME = i18n.t('Event export')
export const PAGE_DESCRIPTION = i18n.t(
    'Export event data for programs, stages and tracked entities to JSON, CSV, or DXF2 format.'
)
const PAGE_ICON = <EventIcon />

const today = new Date()
const threeMonthsBeforeToday = new Date(
    today.getFullYear(),
    today.getMonth() - 3,
    today.getDate()
)

const initialValues = {
    selectedOrgUnits: [],
    selectedPrograms: '',
    programStage: undefined,
    format: defaultFormatOption,
    compression: defaultCompressionOption,
    occurredAfter: jsDateToISO8601(threeMonthsBeforeToday),
    occurredBefore: jsDateToISO8601(today),
    includeDeleted: false,
    dataElementIdScheme: defaultDataElementIdSchemeOption,
    orgUnitIdScheme: defaultOrgUnitIdSchemeOption,
    idScheme: defaultIdSchemeOption,
    inclusion: defaultInclusionOption,
    skipPaging: true,
}

const EventExport = () => {
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
                }}
                render={({ handleSubmit, form, values }) => (
                    <form onSubmit={handleSubmit}>
                        <BasicOptions>
                            <OrgUnitTree multiSelect={false} />
                            <Inclusion />
                            <ProgramPicker autoSelectFirst />
                            <ProgramStages
                                selectedProgram={values.selectedPrograms}
                                form={form}
                            />
                            <Dates
                                label={i18n.t('Date range to export data for')}
                            >
                                <StartDate name="occurredAfter" />
                                <EndDate name="occurredBefore" />
                            </Dates>
                            <Format availableFormats={formatNoXmlOptions} />
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
                            label={i18n.t('Export events')}
                            disabled={!exportEnabled}
                        />
                    </form>
                )}
            />
        </Page>
    )
}

export { EventExport }
