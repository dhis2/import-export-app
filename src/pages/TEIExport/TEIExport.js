import React from 'react'
import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Form } from '@dhis2/ui-forms'

import {
    formatJsonpOptions,
    compressionOptions,
    defaultFormatOption,
    defaultOrgUnitSelectionModeOption,
    defaultTEITypeFilterOption,
    defaultProgramStatusOption,
    defaultFollowUpStatusOption,
    defaultCompressionOption,
    defaultLastUpdatedFilterOption,
    defaultAssignedUserModeOption,
    defaultDataElementIdSchemeOption,
    defaultOrgUnitIdSchemeOption,
    defaultIdSchemeOption,
    defaultEventIdSchemeOption,
} from '../../utils/options'
import {
    Format,
    OrgUnitTree,
    OrgUnitMode,
    TEITypeFilter,
    ProgramStatus,
    FollowUpStatus,
    ProgramStartDate,
    ProgramEndDate,
    ProgramPicker,
    TETypePicker,
    Compression,
    LastUpdatedFilter,
    LastUpdatedStartDate,
    LastUpdatedEndDate,
    LastUpdatedDuration,
    AssignedUserMode,
    UserPicker,
    IncludeDeleted,
    IncludeAllAttributes,
    DataElementIdScheme,
    EventIdScheme,
    IdScheme,
    OrgUnitIdScheme,
    ExportButton,
    FormAlerts,
} from '../../components/Inputs'
import { Page, MoreOptions, TEIIcon } from '../../components/'
import { onExport, validate } from './form-helper'

// PAGE INFO
const PAGE_NAME = i18n.t('Tracked entity instances export')
const PAGE_DESCRIPTION = i18n.t(
    'Export tracked entity instances in the XML, JSON, JSONP or CSV format.'
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
    const engine = useDataEngine()
    const onSubmit = onExport(engine)

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
                render={({ handleSubmit, form, values, submitError }) => (
                    <form onSubmit={handleSubmit}>
                        <OrgUnitTree />
                        <OrgUnitMode />
                        <TEITypeFilter />
                        {values.teiTypeFilter.value == 'PROGRAM' && (
                            <>
                                <ProgramPicker />
                                <ProgramStatus />
                                <FollowUpStatus />
                                <ProgramStartDate />
                                <ProgramEndDate />
                            </>
                        )}
                        {values.teiTypeFilter.value == 'TE' && <TETypePicker />}
                        <Format availableFormats={formatJsonpOptions} />
                        <Compression
                            availableCompressions={compressionOptions}
                        />
                        <MoreOptions>
                            <LastUpdatedFilter />
                            {values.lastUpdatedFilter.value == 'DATE' && (
                                <>
                                    <LastUpdatedStartDate />
                                    <LastUpdatedEndDate />
                                </>
                            )}
                            {values.lastUpdatedFilter.value == 'DURATION' && (
                                <LastUpdatedDuration />
                            )}
                            <AssignedUserMode />
                            {values.assignedUserMode.value == 'PROVIDED' && (
                                <UserPicker />
                            )}
                            <IncludeDeleted value={values.includeDeleted} />
                            <IncludeAllAttributes
                                value={values.includeAllAttributes}
                            />
                            <DataElementIdScheme />
                            <EventIdScheme />
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

export { TEIExport }
