import React from 'react'
import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm } from '@dhis2/ui'

import {
    OrgUnitTree,
    ProgramPicker,
    Format,
    formatOptions,
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
} from '../../components/Inputs/index'
import {
    Page,
    MoreOptions,
    BasicOptions,
    SchemeContainer,
    EventIcon,
} from '../../components/index'
import { onExport, validate } from './form-helper'

const { Form } = ReactFinalForm

// PAGE INFO
const PAGE_NAME = i18n.t('Event export')
const PAGE_DESCRIPTION = i18n.t(
    'Export event data for programs, stages and tracked entities in DXF 2 format.'
)
const PAGE_ICON = <EventIcon />

const today = new Date()
const initialValues = {
    selectedOrgUnits: [],
    selectedPrograms: '',
    programStage: undefined,
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
    inclusion: defaultInclusionOption,
}

const EventExport = () => {
    const { baseUrl } = useConfig()
    const onSubmit = onExport(baseUrl)

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
                subscription={{ values: true }}
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
                                <StartDate />
                                <EndDate />
                            </Dates>
                            <Format availableFormats={formatOptions} />
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
                        <ExportButton label={i18n.t('Export events')} />
                    </form>
                )}
            />
        </Page>
    )
}

export { EventExport }
