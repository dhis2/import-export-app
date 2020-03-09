import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useConfig } from '@dhis2/app-runtime'
import { Form } from '@dhis2/ui-forms'
import i18n from '@dhis2/d2-i18n'

import { getPrevJobDetails, uploadFile } from '../../utils/helper'
import { Page } from '../../components/Page'
import { FileUpload, SINGLE_FILE_VALIDATOR } from '../../components/FileUpload'
import { ImportButtonStrip } from '../../components/ImportButtonStrip'
import { FormAlerts } from '../../components/FormAlerts'
import { GMLIcon } from '../../components/Icon'
import { TaskContext, getNewestTask } from '../../contexts/'

const createInitialValues = prevJobDetails => ({
    files: prevJobDetails.files,
})

const GMLImport = ({ query }) => {
    const {
        tasks: { gml: gmlTasks },
        addTask,
    } = useContext(TaskContext)

    // recreating a previously run job
    const prevJobDetails = getPrevJobDetails(query, gmlTasks)
    const initialValues = createInitialValues(prevJobDetails)

    const [progress, setProgress] = useState(0)
    const [alerts, setAlerts] = useState([])
    const [showFullSummaryTask, setShowFullSummaryTask] = useState(false)
    const { baseUrl } = useConfig()

    const onImport = values => {
        const { dryRun, files } = values

        // send xhr
        const apiBaseUrl = `${baseUrl}/api/`
        const endpoint = 'metadata/gml.json'
        const params = [`dryRun=${dryRun}`, 'format=json'].join('&')
        const url = `${apiBaseUrl}${endpoint}?${params}`

        uploadFile({
            url,
            file: files[0],
            format: 'gml',
            type: 'GML_IMPORT',
            setProgress,
            setAlerts,
            addEntry: (id, entry) =>
                addTask('gml', id, { ...entry, jobDetails: values }),
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
            dataTest="page-import-gml"
            summaryTask={getNewestTask(gmlTasks)}
            showFullSummaryTask={showFullSummaryTask}
        >
            <Form
                onSubmit={onImport}
                initialValues={initialValues}
                validate={validate}
                render={({ handleSubmit, form }) => (
                    <form onSubmit={handleSubmit}>
                        <FileUpload name="files" dataTest="input-file-upload" />
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

GMLImport.propTypes = {
    query: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }),
}

// PAGE INFO
const PAGE_NAME = i18n.t('GML import')
const PAGE_DESCRIPTION = i18n.t(
    'Import geographic data for organisation units using the GML format. GML is an XML grammar for expressing geographical features.'
)
const PAGE_ICON = <GMLIcon />

export { GMLImport }
