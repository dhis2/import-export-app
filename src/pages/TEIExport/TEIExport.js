import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm } from '@dhis2/ui'
import React, { useState } from 'react'
import {
    Page,
    MoreOptions,
    BasicOptions,
    SchemeContainer,
    TEIIcon,
    ValidationSummary,
} from '../../components/index.js'
import {
    Format,
    formatOptions,
    defaultFormatOption,
    OrgUnitMode,
    defaultOrgUnitSelectionModeOption,
    defaultInclusionOption,
    TEITypeFilter,
    defaultTEITypeFilterOption,
    ProgramStatus,
    defaultProgramStatusOption,
    FollowUpStatus,
    defaultFollowUpStatusOption,
    Dates,
    ProgramStartDate,
    ProgramEndDate,
    ProgramPicker,
    TETypePicker,
    LastUpdatedFilter,
    defaultLastUpdatedFilterOption,
    LastUpdatedStartDate,
    LastUpdatedEndDate,
    LastUpdatedDuration,
    AssignedUserMode,
    defaultAssignedUserModeOption,
    IncludeDeleted,
    IncludeAllAttributes,
    DataElementIdScheme,
    defaultDataElementIdSchemeOption,
    EventIdScheme,
    defaultEventIdSchemeOption,
    IdScheme,
    defaultIdSchemeOption,
    OrgUnitIdScheme,
    defaultOrgUnitIdSchemeOption,
    ExportButton,
    FormAlerts,
} from '../../components/Inputs/index.js'
import { onExport, validate } from './form-helper.js'

const { Form } = ReactFinalForm

// PAGE INFO
export const PAGE_NAME = i18n.t('Tracked entity instances export')
export const PAGE_DESCRIPTION = i18n.t(
    'Export tracked entity instances in XML, JSON or CSV format.'
)
const PAGE_ICON = <TEIIcon />

const initialValues = {
    selectedOrgUnits: [],
    selectedPrograms: [],
    selectedTETypes: [],
    selectedUsers: [],
    format: defaultFormatOption,
    ouMode: defaultOrgUnitSelectionModeOption,
    inclusion: defaultInclusionOption,
    teiTypeFilter: defaultTEITypeFilterOption,
    programStatus: defaultProgramStatusOption,
    followUpStatus: defaultFollowUpStatusOption,
    programStartDate: '',
    programEndDate: '',
    compression: '', // disable compression until it is properly implemented in the backend
    lastUpdatedFilter: defaultLastUpdatedFilterOption,
    lastUpdatedStartDate: '',
    lastUpdatedEndDate: '',
    lastUpdatedDuration: '',
    assignedUserModeFilter: false,
    assignedUserMode: defaultAssignedUserModeOption,
    includeDeleted: false,
    includeAllAttributes: false,
    dataElementIdScheme: defaultDataElementIdSchemeOption,
    eventIdScheme: defaultEventIdSchemeOption,
    orgUnitIdScheme: defaultOrgUnitIdSchemeOption,
    idScheme: defaultIdSchemeOption,
}

const TEIExport = () => {
    const [exportEnabled, setExportEnabled] = useState(true)
    const { baseUrl } = useConfig()
    const onSubmit = onExport(baseUrl, setExportEnabled)

    return (
        <Page
            title={PAGE_NAME}
            desc={PAGE_DESCRIPTION}
            icon={PAGE_ICON}
            loading={!exportEnabled}
            dataTest="page-export-tei"
        >
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                validate={validate}
                subscription={{
                    values: true,
                    submitError: true,
                }}
                render={({ handleSubmit, form, values, submitError }) => {
                    const showProgramFilters = values.teiTypeFilter == 'PROGRAM'
                    const showTEFilters = values.teiTypeFilter == 'TE'
                    const showLUDates = values.lastUpdatedFilter == 'DATE'
                    const showLUDuration =
                        values.lastUpdatedFilter == 'DURATION'

                    return (
                        <form onSubmit={handleSubmit}>
                            <BasicOptions>
                                <OrgUnitMode value={values.ouMode} />
                                <TEITypeFilter />
                                <ProgramPicker
                                    label={i18n.t('Program to export from')}
                                    show={showProgramFilters}
                                />
                                <ProgramStatus show={showProgramFilters} />
                                <FollowUpStatus show={showProgramFilters} />
                                <Dates
                                    label={i18n.t('Enrollment date range')}
                                    show={showProgramFilters}
                                >
                                    <ProgramStartDate
                                        show={showProgramFilters}
                                    />
                                    <ProgramEndDate show={showProgramFilters} />
                                </Dates>
                                <TETypePicker show={showTEFilters} />
                                <Format availableFormats={formatOptions} />
                            </BasicOptions>
                            <MoreOptions>
                                <LastUpdatedFilter />
                                <Dates show={showLUDates}>
                                    <LastUpdatedStartDate show={showLUDates} />
                                    <LastUpdatedEndDate show={showLUDates} />
                                </Dates>
                                <LastUpdatedDuration show={showLUDuration} />
                                <AssignedUserMode />
                                <IncludeDeleted />
                                <IncludeAllAttributes />
                                <SchemeContainer>
                                    <DataElementIdScheme />
                                    <EventIdScheme />
                                    <OrgUnitIdScheme />
                                    <IdScheme />
                                </SchemeContainer>
                            </MoreOptions>
                            <ValidationSummary />
                            <ExportButton
                                label={i18n.t(
                                    'Export tracked entity instances'
                                )}
                                disabled={!exportEnabled}
                            />
                            <FormAlerts alerts={submitError} />
                        </form>
                    )
                }}
            />
        </Page>
    )
}

export { TEIExport }
