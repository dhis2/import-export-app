import React from 'react'
import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Form, hasValue, composeValidators } from '@dhis2/ui-forms'
import { Button } from '@dhis2/ui-core'

import { jsDateToISO8601, locationAssign, pathToId } from '../../utils/helper'
import {
    formatOptions,
    compressionOptions,
    inclusionOptions,
    defaultFormatOption,
    defaultCompressionOption,
    defaultIdSchemeOption,
    defaultInclusionOption,
} from '../../utils/options'
import { ALL_VALUE } from '../../hooks/useProgramStages'
import { Page } from '../../components/Page'
import { RadioGroup } from '../../components/RadioGroup'
import {
    DatePicker,
    DATE_VALIDATOR,
    DATE_BEFORE_VALIDATOR,
    DATE_AFTER_VALIDATOR,
} from '../../components/DatePicker'
import { Switch } from '../../components/Switch'
import {
    OrgUnitTreeField,
    SINGLE_EXACT_ORG_VALIDATOR,
} from '../../components/OrgUnitTree'
import {
    ProgramStages,
    SINGLE_EXACT_PROGRAMSTAGE_VALIDATOR,
} from '../../components/ProgramStages'
import {
    ProgramPickerField,
    SINGLE_EXACT_PROGRAM_VALIDATOR,
} from '../../components/ProgramPicker'
import { MoreOptions } from '../../components/MoreOptions'
import { IdScheme } from '../../components/ElementSchemes'
import { EventIcon } from '../../components/Icon'

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

    const onExport = values => {
        const {
            selectedOrgUnits,
            selectedPrograms,
            programStage,
            format,
            compression,
            startDate,
            endDate,
            includeDeleted,
            idScheme,
            inclusion,
        } = values

        // generate URL and redirect
        const apiBaseUrl = `${baseUrl}/api/`
        const endpoint = `events`
        const endpointExtension = compression.value
            ? `${format.value}.${compression.value}`
            : format.value
        const filename = `${endpoint}.${endpointExtension}`
        const downloadUrlParams = [
            'links=false',
            'skipPaging=true',
            `orgUnit=${pathToId(selectedOrgUnits[0])}`,
            `programs=${selectedPrograms[0]}`,
            `includeDeleted=${includeDeleted}`,
            `idScheme=${idScheme.value}`,
            `attachment=${filename}`,
            `startDate=${jsDateToISO8601(startDate)}`,
            `endDate=${jsDateToISO8601(endDate)}`,
            `ouMode=${inclusion.value}`,
            `format=${format.value}`,
            programStage.value != ALL_VALUE
                ? `programStage=${programStage.value}`
                : '',
        ]
            .filter(s => s != '')
            .join('&')
        const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`
        locationAssign(url)
    }

    const validate = values => ({
        selectedOrgUnits: composeValidators(
            hasValue,
            SINGLE_EXACT_ORG_VALIDATOR
        )(values.selectedOrgUnits),
        selectedPrograms: composeValidators(
            hasValue,
            SINGLE_EXACT_PROGRAM_VALIDATOR
        )(values.selectedPrograms),
        programStage: composeValidators(
            hasValue,
            SINGLE_EXACT_PROGRAMSTAGE_VALIDATOR
        )(values.programStage),
        startDate: composeValidators(
            hasValue,
            DATE_VALIDATOR,
            DATE_BEFORE_VALIDATOR
        )(values.startDate, values.endDate),
        endDate: composeValidators(
            hasValue,
            DATE_VALIDATOR,
            DATE_AFTER_VALIDATOR
        )(values.endDate, values.startDate),
    })

    return (
        <Page
            title={PAGE_NAME}
            desc={PAGE_DESCRIPTION}
            icon={PAGE_ICON}
            dataTest="page-export-data"
        >
            <Form
                onSubmit={onExport}
                initialValues={initialValues}
                validate={validate}
                render={({ handleSubmit, form, values }) => (
                    <form onSubmit={handleSubmit}>
                        <OrgUnitTreeField
                            name="selectedOrgUnits"
                            multiSelect={false}
                            dataTest="input-org-unit-tree"
                        />
                        <ProgramPickerField
                            name="selectedPrograms"
                            multiSelect={false}
                            withActions={false}
                            autoSelectFirst
                            dataTest="input-program-picker"
                        />
                        <ProgramStages
                            selectedPrograms={values.selectedPrograms}
                            form={form}
                            dataTest="input-program-stage-select"
                        />
                        <DatePicker
                            name="startDate"
                            label={i18n.t('Start date')}
                            dataTest="input-start-date"
                        />
                        <DatePicker
                            name="endDate"
                            label={i18n.t('End date')}
                            dataTest="input-end-date"
                        />
                        <RadioGroup
                            name="format"
                            label={i18n.t('Format')}
                            options={formatOptions}
                            dataTest="input-format"
                        />
                        <RadioGroup
                            name="compression"
                            label={i18n.t('Compression')}
                            options={compressionOptions}
                            dataTest="input-compression"
                        />
                        <MoreOptions dataTest="interaction-more-options">
                            <Switch
                                label={i18n.t('Include deleted')}
                                name="includeDeleted"
                                dataTest="input-include-deleted"
                            />
                            <IdScheme dataTest="input-id-scheme" />
                            <RadioGroup
                                name="inclusion"
                                label={i18n.t('Inclusion')}
                                options={inclusionOptions}
                                dataTest="input-inclusion"
                            />
                        </MoreOptions>
                        <Button
                            primary
                            type="submit"
                            disabled={values.programStage == undefined}
                            dataTest="input-export-submit"
                        >
                            {i18n.t('Export')}
                        </Button>
                    </form>
                )}
            />
        </Page>
    )
}

// PAGE INFO
const PAGE_NAME = i18n.t('Event export')
const PAGE_DESCRIPTION = i18n.t(
    'Export event data for programs, stages and tracked entities in the DXF 2 format.'
)
const PAGE_ICON = <EventIcon />

export { EventExport }
