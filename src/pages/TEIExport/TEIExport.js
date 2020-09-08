import React from 'react'
import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm } from '@dhis2/ui'

import {
    Format,
    formatJsonpOptions,
    defaultFormatOption,
    OrgUnitTree,
    OrgUnitMode,
    defaultOrgUnitSelectionModeOption,
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
    Compression,
    defaultCompressionOption,
    LastUpdatedFilter,
    defaultLastUpdatedFilterOption,
    LastUpdatedStartDate,
    LastUpdatedEndDate,
    LastUpdatedDuration,
    AssignedUserMode,
    defaultAssignedUserModeOption,
    UserPicker,
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
} from '../../components/Inputs/index'
import {
    Page,
    MoreOptions,
    BasicOptions,
    SchemeContainer,
    TEIIcon,
} from '../../components/index'
import { onExport, validate } from './form-helper'

const { Form } = ReactFinalForm

// PAGE INFO
const PAGE_NAME = i18n.t('Tracked entity instances export')
const PAGE_DESCRIPTION = i18n.t(
    'Export tracked entity instances in XML, JSON, JSONP or CSV format.'
)
const PAGE_ICON = <TEIIcon />

const initialValues = {
    selectedOrgUnits: [],
    selectedPrograms: [],
    selectedTETypes: [],
    selectedUsers: [],
    format: defaultFormatOption,
    ouMode: defaultOrgUnitSelectionModeOption,
    teiTypeFilter: defaultTEITypeFilterOption,
    programStatus: defaultProgramStatusOption,
    followUpStatus: defaultFollowUpStatusOption,
    programStartDate: '',
    programEndDate: '',
    compression: defaultCompressionOption,
    lastUpdatedFilter: defaultLastUpdatedFilterOption,
    lastUpdatedStartDate: '',
    lastUpdatedEndDate: '',
    lastUpdatedDuration: '',
    assignedUserMode: defaultAssignedUserModeOption,
    includeDeleted: false,
    includeAllAttributes: false,
    dataElementIdScheme: defaultDataElementIdSchemeOption,
    eventIdScheme: defaultEventIdSchemeOption,
    orgUnitIdScheme: defaultOrgUnitIdSchemeOption,
    idScheme: defaultIdSchemeOption,
}

const TEIExport = () => {
    const { baseUrl } = useConfig()
    const onSubmit = onExport(baseUrl)

    return (
        <Page
            title={PAGE_NAME}
            desc={PAGE_DESCRIPTION}
            icon={PAGE_ICON}
            dataTest="page-export-tei"
        >
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                validate={validate}
                subscription={{ values: true, submitError: true }}
                render={({ handleSubmit, form, values, submitError }) => {
                    const showProgramFilters = values.teiTypeFilter == 'PROGRAM'
                    const showTEFilters = values.teiTypeFilter == 'TE'
                    const showLUDates = values.lastUpdatedFilter == 'DATE'
                    const showLUDuration =
                        values.lastUpdatedFilter == 'DURATION'
                    const showUserPicker = values.assignedUserMode == 'PROVIDED'

                    return (
                        <form onSubmit={handleSubmit}>
                            <BasicOptions>
                                <OrgUnitTree />
                                <OrgUnitMode />
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
                                <Format availableFormats={formatJsonpOptions} />
                                <Compression />
                            </BasicOptions>
                            <MoreOptions>
                                <LastUpdatedFilter />
                                <Dates show={showLUDates}>
                                    <LastUpdatedStartDate show={showLUDates} />
                                    <LastUpdatedEndDate show={showLUDates} />
                                </Dates>
                                <LastUpdatedDuration show={showLUDuration} />
                                <AssignedUserMode />
                                <UserPicker show={showUserPicker} />
                                <IncludeDeleted />
                                <IncludeAllAttributes />
                                <SchemeContainer>
                                    <DataElementIdScheme />
                                    <EventIdScheme />
                                    <OrgUnitIdScheme />
                                    <IdScheme />
                                </SchemeContainer>
                            </MoreOptions>
                            <ExportButton
                                label={i18n.t(
                                    'Export tracked entity instances'
                                )}
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
