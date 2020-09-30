import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useConfig } from '@dhis2/app-runtime'
import { ReactFinalForm } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'

import { getPrevJobDetails } from '../../utils/helper'
import {
    FileUpload,
    ImportButtonStrip,
    FormAlerts,
} from '../../components/Inputs/index'
import { Page, GMLIcon, ValidationSummary } from '../../components/index'
import { TaskContext, getNewestTask } from '../../contexts/index'
import { onImport } from './form-helper'

const { Form } = ReactFinalForm

// PAGE INFO
export const PAGE_NAME = i18n.t('GML import')
export const PAGE_DESCRIPTION = i18n.t(
    'Import geographic data for organisation units using the GML format. GML is an XML grammar for expressing geographical features.'
)
const PAGE_ICON = <GMLIcon />

const createInitialValues = prevJobDetails => ({
    files: prevJobDetails.files,
})

const GMLImport = () => {
    const {
        tasks: { gml: gmlTasks },
        addTask,
    } = useContext(TaskContext)

    // recreating a previously run job
    const query = useLocation().query
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
