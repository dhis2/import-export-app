import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useConfig } from '@dhis2/app-runtime'
import { Form } from '@dhis2/ui-forms'
import i18n from '@dhis2/d2-i18n'

import { getPrevJobDetails, uploadFile } from '../../utils/helper'
import {
    formatOptions,
    defaultFormatOption,
    defaultOrgUnitIdSchemeOption,
    defaultEventIdSchemeOption,
} from '../../utils/options'
import { Page } from '../../components/Page'
import { FileUpload, SINGLE_FILE_VALIDATOR } from '../../components/FileUpload'
import { RadioGroupField } from '../../components/RadioGroup'
import { MoreOptions } from '../../components/MoreOptions'
import { EventIdScheme, OrgUnitIdScheme } from '../../components/ElementSchemes'
import { ImportButtonStrip } from '../../components/ImportButtonStrip'
import { FormAlerts } from '../../components/FormAlerts'
import { EventIcon } from '../../components/Icon'
import { TaskContext, getNewestTask } from '../../contexts/'

const createInitialValues = prevJobDetails => ({
    files: prevJobDetails.files,
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
    const initialValues = createInitialValues(prevJobDetails)

    const [progress, setProgress] = useState(0)
    const [alerts, setAlerts] = useState([])
    const [showFullSummaryTask, setShowFullSummaryTask] = useState(false)
    const { baseUrl } = useConfig()

    const onImport = values => {
        const { dryRun, files, format, orgUnitIdScheme, eventIdScheme } = values

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

        uploadFile({
            url,
            file: files[0],
            format: format.value,
            type: 'EVENT_IMPORT',
            setProgress,
            setAlerts,
            addEntry: (id, entry) =>
                addTask('event', id, { ...entry, jobDetails: values }),
        })
        setShowFullSummaryTask(true)
    }

    const validate = values => {
        return {
            files: SINGLE_FILE_VALIDATOR(values.files),
        }
    }

    return (
        <Page
            title={PAGE_NAME}
            desc={PAGE_DESCRIPTION}
            icon={PAGE_ICON}
            loading={progress}
            dataTest="page-import-event"
            summaryTask={getNewestTask(eventTasks)}
            showFullSummaryTask={showFullSummaryTask}
        >
            <Form
                onSubmit={onImport}
                initialValues={initialValues}
                validate={validate}
                render={({ handleSubmit, form }) => (
                    <form onSubmit={handleSubmit}>
                        <FileUpload name="files" dataTest="input-file-upload" />
                        <RadioGroupField
                            name="format"
                            label={i18n.t('Format')}
                            options={formatOptions}
                            dataTest="input-format"
                        />
                        <MoreOptions dataTest="interaction-more-options">
                            <EventIdScheme dataTest="input-event-id-scheme" />
                            <OrgUnitIdScheme dataTest="input-org-unit-id-scheme" />
                        </MoreOptions>
                        <ImportButtonStrip
                            form={form}
                            dryRunDataTest="input-dry-run"
                            importDataTest="input-import-submit"
                            dataTest="input-import-button-strip"
                        />
                        <FormAlerts
                            alerts={alerts}
                            dataTest="input-form-alerts"
                        />
                    </form>
                )}
            />
        </Page>
    )
}

EventImport.propTypes = {
    query: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }),
}

// PAGE INFO
const PAGE_NAME = i18n.t('Event import')
const PAGE_DESCRIPTION = i18n.t(
    'Import events for programs, stages and tracked entities using the DXF 2 format.'
)
const PAGE_ICON = <EventIcon />

export { EventImport }
