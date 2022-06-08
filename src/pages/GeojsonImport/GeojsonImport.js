import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm } from '@dhis2/ui'
import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Page, GeojsonIcon, ValidationSummary } from '../../components/index'
import {
    FileUpload,
    GeojsonPropertyMatch,
    GeojsonAttributePicker,
    defaultOrgUnitIdSchemeOption,
    ImportButtonStrip,
    FormAlerts,
} from '../../components/Inputs/index'
import { TaskContext, getNewestTask } from '../../contexts/index'
import { getPrevJobDetails } from '../../utils/helper'
import { onImport } from './form-helper'

const { Form } = ReactFinalForm

// PAGE INFO
export const PAGE_NAME = i18n.t('GeoJSON import')
export const PAGE_DESCRIPTION = i18n.t(
    'Import geographic data for organisation units using the GeoJSON format. This import can also be used for associated geometries or catchment areas.'
)
const PAGE_ICON = <GeojsonIcon />

const createInitialValues = prevJobDetails => ({
    files: prevJobDetails.files,
    orgUnitIdScheme:
        prevJobDetails.orgUnitIdScheme || defaultOrgUnitIdSchemeOption,
})

const GeojsonImport = () => {
    const {
        tasks: { geojson: geojsonTasks },
        addTask,
    } = useContext(TaskContext)

    // recreating a previously run job
    const query = useLocation().query

    const prevJobDetails = getPrevJobDetails(query, geojsonTasks)
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
            dataTest="page-import-geojson"
            summaryTask={getNewestTask(geojsonTasks)}
            showFullSummaryTask={showFullSummaryTask}
        >
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                render={({ handleSubmit, form, submitError }) => (
                    <form onSubmit={handleSubmit}>
                        <FileUpload
                            helpText={i18n.t(
                                'GeoJSON feature id should match the organsation unit id, or match by a feature property below.'
                            )}
                        />
                        <GeojsonPropertyMatch />
                        <GeojsonAttributePicker />
                        <ValidationSummary />
                        <ImportButtonStrip form={form} />
                        <FormAlerts alerts={submitError} />
                    </form>
                )}
            />
        </Page>
    )
}

export { GeojsonImport }
