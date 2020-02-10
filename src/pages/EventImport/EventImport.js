import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'

// import s from './EventImport.module.css';
import { eventImportPage as p } from '../../utils/pages'
import { uploadFile } from '../../utils/helper'
import { testIds } from '../../utils/testIds'
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

const EventImport = ({ query }) => {
    const { event: eventTasks, addTask } = useContext(TaskContext)

    // recreating a previously run job
    let prevJobDetails = undefined
    if (query && query.id) {
        const job = eventTasks[query.id]
        if (job) {
            prevJobDetails = job.jobDetails
        }
    }

    const initialState = {
        file: prevJobDetails ? prevJobDetails.file : undefined,
        format: prevJobDetails ? prevJobDetails.format : defaultFormatOption,
        orgUnitIdScheme: prevJobDetails
            ? prevJobDetails.orgUnitIdScheme
            : defaultOrgUnitIdSchemeOption,
        eventIdScheme: prevJobDetails
            ? prevJobDetails.eventIdScheme
            : defaultEventIdSchemeOption,
    }

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

    const onSubmit = ({ dryRun }) => {
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
            dataTest={testIds.EventImport.Page}
            summaryTask={getNewestTask(eventTasks)}
            showFullSummaryTask={showFullSummaryTask}
        >
            <FileUpload
                name="upload"
                file={file}
                setFile={setFile}
                dataTest={testIds.EventImport.FileUpload}
            />
            <RadioGroup
                name="format"
                label={i18n.t('Format')}
                options={formatOptions}
                setValue={setFormat}
                checked={format}
                dataTest={testIds.EventImport.format}
            />
            <MoreOptions dataTest={testIds.EventImport.MoreOptions}>
                <EventIdScheme
                    selected={eventIdScheme}
                    setSelected={setEventIdScheme}
                    dataTest={testIds.EventImport.EventIdScheme}
                />
                <OrgUnitIdScheme
                    selected={orgUnitIdScheme}
                    setSelected={setOrgUnitIdScheme}
                    dataTest={testIds.EventImport.OrgUnitIdScheme}
                />
            </MoreOptions>
            <ImportButtonStrip
                onSubmit={onSubmit}
                dryRunDataTest={testIds.DataImport.dryRun}
                importDataTest={testIds.DataImport.submit}
                dataTest={testIds.DataImport.ImportButtonStrip}
            />
            <FormAlerts
                alerts={alerts}
                dataTest={testIds.EventImport.FormAlerts}
            />
        </Page>
    )
}

EventImport.propTypes = {
    query: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }),
}

export { EventImport }
