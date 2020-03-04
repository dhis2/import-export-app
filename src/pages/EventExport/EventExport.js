import React, { useState } from 'react'
import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
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
import { useProgramStages, ALL_VALUE } from '../../hooks/useProgramStages'
import { Select } from '../../components/Select'
import { Page } from '../../components/Page'
import { RadioGroup } from '../../components/RadioGroup'
import { DatePicker } from '../../components/DatePicker'
import { Switch } from '../../components/Switch'
import { OrgUnitTree } from '../../components/OrgUnitTree'
import { ProgramPicker } from '../../components/ProgramPicker'
import { MoreOptions } from '../../components/MoreOptions'
import { IdScheme } from '../../components/ElementSchemes'
import { FormAlerts } from '../../components/FormAlerts'
import { EventIcon } from '../../components/Icon'

const today = new Date()

const EventExport = () => {
    const [selectedOrgUnits, setSelectedOrgUnits] = useState([])
    const [selectedPrograms, setSelectedPrograms] = useState([])
    const [programStage, setProgramStage] = useState(undefined)
    const [format, setFormat] = useState(defaultFormatOption)
    const [compression, setCompression] = useState(defaultCompressionOption)
    const [startDate, setStartDate] = useState(
        new Date(today.getFullYear(), today.getMonth() - 3, today.getDate())
    )
    const [endDate, setEndDate] = useState(today)
    const [includeDeleted, setIncludeDeleted] = useState(false)
    const [idScheme, setIdScheme] = useState(defaultIdSchemeOption)
    const [inclusion, setInclusion] = useState(defaultInclusionOption)
    const [alerts, setAlerts] = useState([])
    const { baseUrl } = useConfig()

    const {
        loading: programStagesLoading,
        error: programStagesError,
        validationText: programStagesValidationText,
        programStages,
    } = useProgramStages(
        selectedPrograms.length == 0 ? null : selectedPrograms[0],
        setProgramStage
    )

    const onExport = () => {
        // validate
        const alerts = []
        const timestamp = new Date().getTime()

        if (selectedOrgUnits.length == 0) {
            alerts.push({
                id: `org-unit-length-${timestamp}`,
                warning: true,
                message: i18n.t('One organisation unit must be selected'),
            })
        }

        if (selectedPrograms.length == 0) {
            alerts.push({
                id: `program-length-${timestamp}`,
                warning: true,
                message: i18n.t('One program must be selected'),
            })
        }

        if (!programStage) {
            alerts.push({
                id: `program-stage-${timestamp}`,
                warning: true,
                message: i18n.t('One program stage must be selected'),
            })
        }

        if (endDate < startDate) {
            alerts.push({
                id: `period-${timestamp}`,
                warning: true,
                message: i18n.t('End date must be after start date'),
            })
        }

        setAlerts(alerts)

        if (alerts.length != 0) {
            return
        }

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

    const onDateChange = stateFn => date => {
        stateFn(date)
    }

    return (
        <Page
            title={PAGE_NAME}
            desc={PAGE_DESCRIPTION}
            icon={PAGE_ICON}
            dataTest="page-export-data"
        >
            <OrgUnitTree
                selected={selectedOrgUnits}
                setSelected={setSelectedOrgUnits}
                multiSelect={false}
                dataTest="input-org-unit-tree"
            />
            <ProgramPicker
                selected={selectedPrograms}
                setSelected={setSelectedPrograms}
                multiSelect={false}
                withActions={false}
                autoSelectFirst
                dataTest="input-program-picker"
            />
            <Select
                loading={programStagesLoading}
                name="programStages"
                label={i18n.t('Program stage')}
                options={programStages}
                selected={programStage}
                setValue={setProgramStage}
                dataTest="input-program-stage-select"
                validationText={programStagesValidationText}
                error={!!programStagesError}
                dense
            />
            <DatePicker
                name="startDate"
                label={i18n.t('Start date')}
                date={startDate}
                onChange={onDateChange(setStartDate)}
                dataTest="input-start-date"
            />
            <DatePicker
                name="endDate"
                label={i18n.t('End date')}
                date={endDate}
                onChange={onDateChange(setEndDate)}
                dataTest="input-end-date"
            />
            <RadioGroup
                name="format"
                label={i18n.t('Format')}
                options={formatOptions}
                setValue={setFormat}
                checked={format}
                dataTest="input-format"
            />
            <RadioGroup
                name="compression"
                label={i18n.t('Compression')}
                options={compressionOptions}
                setValue={setCompression}
                checked={compression}
                dataTest="input-compression"
            />
            <MoreOptions dataTest="interaction-more-options">
                <Switch
                    label={i18n.t('Include deleted')}
                    name="includeDeleted"
                    checked={includeDeleted}
                    setChecked={setIncludeDeleted}
                    dataTest="input-include-deleted"
                />
                <IdScheme
                    selected={idScheme}
                    setSelected={setIdScheme}
                    dataTest="input-id-scheme"
                />
                <RadioGroup
                    name="inclusion"
                    label={i18n.t('Inclusion')}
                    options={inclusionOptions}
                    setValue={setInclusion}
                    checked={inclusion}
                    dataTest="input-inclusion"
                />
            </MoreOptions>
            <Button
                primary
                disabled={programStage == undefined}
                onClick={onExport}
                dataTest="input-export-submit"
            >
                {i18n.t('Export')}
            </Button>
            <FormAlerts alerts={alerts} dataTest="input-form-alerts" />
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
