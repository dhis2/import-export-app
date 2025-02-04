import { useConfig } from '@dhis2/app-runtime'
import { ReactFinalForm } from '@dhis2/ui'
import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { GeometryFormat } from '../../components/Geometry/index.js'
import { Page, ValidationSummary } from '../../components/index.js'
import {
    FileUpload,
    ImportButtonStrip,
    FormAlerts,
} from '../../components/Inputs/index.js'
import { TaskContext, getNewestTask } from '../../contexts/index.js'
import { getPrevJobDetails } from '../../utils/helper.js'
import { PAGE_NAME, PAGE_DESCRIPTION, PAGE_ICON } from './GeometryImport.jsx'
import { onImport } from './gml-helper.js'

const { Form } = ReactFinalForm

const createInitialValues = (prevJobDetails) => ({
    files: prevJobDetails.files,
})

const GMLImport = () => {
    const {
        tasks: { gml: gmlTasks },
        addTask,
    } = useContext(TaskContext)

    // recreating a previously run job
    const { query } = useLocation()
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
            <GeometryFormat format="gml" />
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                render={({ handleSubmit, form, submitError }) => (
                    <form onSubmit={handleSubmit}>
                        <FileUpload />
                        <ValidationSummary />
                        <ImportButtonStrip form={form} />
                        <FormAlerts alerts={submitError} />
                    </form>
                )}
            />
        </Page>
    )
}

export { GMLImport }
