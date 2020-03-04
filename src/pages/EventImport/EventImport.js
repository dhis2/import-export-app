import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'

import { eventImportPage as p } from '../../utils/pages'
import { getPrevJobDetails, uploadFile } from '../../utils/helper'
import {
    formatOptions,
    defaultFormatOption,
    defaultOrgUnitIdSchemeOption,
    defaultEventIdSchemeOption,
} from '../../utils/options'
import { Page } from '../../components/Page'
import { FileUpload } from '../../components/FileUpload'
import { RadioGroup } from '../../components/RadioGroup'
import { MoreOptions } from '../../components/MoreOptions'
import { EventIdScheme, OrgUnitIdScheme } from '../../components/ElementSchemes'
import { ImportButtonStrip } from '../../components/ImportButtonStrip'
import { FormAlerts } from '../../components/FormAlerts'
import { TaskContext, getNewestTask } from '../../contexts/'

const createInitialState = prevJobDetails => ({
    file: prevJobDetails.file,
    format: prevJobDetails.format || defaultFormatOption,
    orgUnitIdScheme:
        prevJobDetails.orgUnitIdScheme || defaultOrgUnitIdSchemeOption,
    eventIdScheme: prevJobDetails.eventIdScheme || defaultEventIdSchemeOption,
})

const EventImport = ({ query }) => {
    const {
        tasks: { event: eventTasks },
        addTask,
    } = useContext(TaskContext)

    // recreating a previously run job
    const prevJobDetails = getPrevJobDetails(query, eventTasks)
    const initialState = createInitialState(prevJobDetails)

    const [progress, setProgress] = useState(0)
    const [file, setFile] = useState(initialState.file)
    const [format, setFormat] = useState(initialState.format)
    const [orgUnitIdScheme, setOrgUnitIdScheme] = useState(
        initialState.orgUnitIdScheme
    )
    const [eventIdScheme, setEventIdScheme] = useState(
        initialState.eventIdScheme
    )
    const [alerts, setAlerts] = useState([])
    const [showFullSummaryTask, setShowFullSummaryTask] = useState(false)
    const { baseUrl } = useConfig()

    const onImport = ({ dryRun }) => {
        // validate
        const alerts = []
        const timestamp = new Date().getTime()

        setAlerts(alerts)

        if (!file) {
            alerts.push({
                id: `file-${timestamp}`,
                warning: true,
                message: i18n.t('An import file must be selected'),
            })
        }

        if (alerts.length != 0) {
            return
        }

        // send xhr
        const apiBaseUrl = `${baseUrl}/api/`
        const endpoint = 'events.json'
        const params = [
            `dryRun=${dryRun}`,
            `orgUnitIdScheme=${orgUnitIdScheme.value}`,
            `eventIdScheme=${eventIdScheme.value}`,
            `payloadFormat=${format.value}`,
            'skipFirst=true',
            'async=true',
        ].join('&')
        const url = `${apiBaseUrl}${endpoint}?${params}`

        const jobDetails = {
            file,
            format,
            dryRun,
            eventIdScheme,
            orgUnitIdScheme,
        }

        uploadFile({
            url,
            file,
            format: format.value,
            type: 'EVENT_IMPORT',
            setProgress,
            setAlerts,
            addEntry: (id, entry) =>
                addTask('event', id, { ...entry, jobDetails: jobDetails }),
        })
        setShowFullSummaryTask(true)
    }

    return (
        <Page
            title={p.name}
            desc={p.description}
            icon={p.icon}
            loading={progress}
            dataTest="page-import-event"
            summaryTask={getNewestTask(eventTasks)}
            showFullSummaryTask={showFullSummaryTask}
        >
            <FileUpload
                name="upload"
                file={file}
                setFile={setFile}
                dataTest="input-file-upload"
            />
            <RadioGroup
                name="format"
                label={i18n.t('Format')}
                options={formatOptions}
                setValue={setFormat}
                checked={format}
                dataTest="input-format"
            />
            <MoreOptions dataTest="interaction-more-options">
                <EventIdScheme
                    selected={eventIdScheme}
                    setSelected={setEventIdScheme}
                    dataTest="input-event-id-scheme"
                />
                <OrgUnitIdScheme
                    selected={orgUnitIdScheme}
                    setSelected={setOrgUnitIdScheme}
                    dataTest="input-org-unit-id-scheme"
                />
            </MoreOptions>
            <ImportButtonStrip
                onImport={onImport}
                dryRunDataTest="input-dry-run"
                importDataTest="input-import-submit"
                dataTest="input-import-button-strip"
            />
            <FormAlerts alerts={alerts} dataTest="input-form-alerts" />
        </Page>
    )
}

EventImport.propTypes = {
    query: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }),
}

export { EventImport }
