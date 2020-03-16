import React from 'react'
import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Form } from '@dhis2/ui-forms'

import {
    formatOptions,
    compressionOptions,
    defaultFormatOption,
    defaultCompressionOption,
    defaultIdSchemeOption,
    defaultInclusionOption,
} from '../../utils/options'
import {
    OrgUnitTree,
    ProgramPicker,
    Format,
    Compression,
    StartDate,
    EndDate,
    IncludeDeleted,
    Inclusion,
    ExportButton,
    ProgramStages,
    IdScheme,
} from '../../components/Inputs'
import { Page, MoreOptions, EventIcon } from '../../components/'
import { onExport, validate } from './form-helper'

// PAGE INFO
const PAGE_NAME = i18n.t('Event export')
const PAGE_DESCRIPTION = i18n.t(
    'Export event data for programs, stages and tracked entities in the DXF 2 format.'
)
const PAGE_ICON = <EventIcon />

const today = new Date()
const initialValues = {
    selectedOrgUnits: [],
    selectedPrograms: [],
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
                        <OrgUnitTree multiSelect={false} />
                        <ProgramPicker autoSelectFirst />
                        <ProgramStages
                            selectedPrograms={values.selectedPrograms}
                            form={form}
                        />
                        <StartDate />
                        <EndDate />
                        <Format availableFormats={formatOptions} />
                        <Compression
                            availableCompressions={compressionOptions}
                        />
                        <MoreOptions>
                            <IncludeDeleted value={values.includeDeleted} />
                            <IdScheme />
                            <Inclusion />
                        </MoreOptions>
                        <ExportButton />
                    </form>
                )}
            />
        </Page>
    )
}

export { EventExport }
