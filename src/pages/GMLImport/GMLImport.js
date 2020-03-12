import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useConfig } from '@dhis2/app-runtime'
import { Form } from '@dhis2/ui-forms'
import i18n from '@dhis2/d2-i18n'

import { getPrevJobDetails } from '../../utils/helper'
import { Page } from '../../components/Page'
import {
    FileUpload,
    ImportButtonStrip,
    FormAlerts,
} from '../../components/Inputs/'
import { GMLIcon } from '../../components/Icon'
import { TaskContext, getNewestTask } from '../../contexts/'
import { onImport } from './form-helper'

// PAGE INFO
const PAGE_NAME = i18n.t('GML import')
const PAGE_DESCRIPTION = i18n.t(
    'Import geographic data for organisation units using the GML format. GML is an XML grammar for expressing geographical features.'
)
const PAGE_ICON = <GMLIcon />

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
    const [showFullSummaryTask, setShowFullSummaryTask] = useState(false)
    const { baseUrl } = useConfig()

    const onSubmit = onImport({
        baseUrl,
        setProgress,
        addTask,
        setShowFullSummaryTask,
    })

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
                onSubmit={onSubmit}
                initialValues={initialValues}
                render={({ handleSubmit, form, submitError }) => (
                    <form onSubmit={handleSubmit}>
                        <FileUpload />
                        <ImportButtonStrip form={form} />
                        <FormAlerts alerts={submitError} />
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

export { GMLImport }
