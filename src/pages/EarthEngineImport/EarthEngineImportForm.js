import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, Divider } from '@dhis2/ui'
import React, { useState, useContext } from 'react'
import { Page, DataIcon } from '../../components/index.js'
import { FormAlerts, ImportButtonStrip } from '../../components/Inputs/index.js'
import { TaskContext, getNewestTask } from '../../contexts/index.js'
import { AggregationType } from './components/AggregationType.js'
import { DataElements } from './components/DataElements.js'
import { DataPreview } from './components/DataPreview.js'
import { EarthEngineId } from './components/EarthEngineId.js'
import { MappingTable } from './components/MapGenderAgeGroupsTable.js'
import { OrganisationUnits } from './components/OrganisationUnits.js'
import { Periods } from './components/Periods.js'
import { Rounding, defaultRoundingOption } from './components/Rounding.js'
import { onImport } from './form-helper.js'
import { useCachedDataQuery } from './util/CachedQueryProvider.js'
// import { ActionButtons } from './ActionButtons.js'
// import styles from './styles/EarthEngineImportForm.module.css'

const { Form } = ReactFinalForm

const EarthEngineImportForm = () => {
    const {
        tasks: { earthengine: earthengineTasks },
        addTask,
    } = useContext(TaskContext)
    const engine = useDataEngine()
    const { displayProperty } = useCachedDataQuery()

    // resulting data and display options
    // const [showPreview, setShowPreview] = useState(false)
    const [progress, setProgress] = useState(0)
    const [showFullSummaryTask, setShowFullSummaryTask] = useState(false)

    // const showData = (e) => {
    //     console.log('e', e)
    //     e.preventDefault()
    //     e.stopPropagation()
    //     setShowPreview(true)
    // }

    // const isMissingRequiredInputs = () => {
    //     return false
    //     // return !eeId || !period || !orgUnits || !aggregation || !dataElement
    // }

    // const clearEeData = () => {
    //     setShowPreview(false)
    //     // setEeData(null)
    //     window.scrollTo(0, 0)
    // }

    const initialValues = {
        rounding: defaultRoundingOption,
        organisationUnits: [],
        dataElement: null,
    }

    const onSubmit = onImport({
        engine,
        displayProperty,
        setProgress,
        addTask,
        setShowFullSummaryTask,
    })

    return (
        <Page
            title={i18n.t('Earth Engine import')}
            desc={i18n.t(
                'Import Earth Engine data to data sets and data elements'
            )}
            icon={<DataIcon />}
            loading={progress}
            dataTest="page-import-earthengine"
            summaryTask={getNewestTask(earthengineTasks)}
            showFullSummaryTask={showFullSummaryTask}
            showFileDetails={false}
        >
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                render={({ handleSubmit, form, submitError }) => (
                    <form onSubmit={handleSubmit}>
                        <h2>{i18n.t('Earth Engine source')}</h2>
                        <Divider />
                        <EarthEngineId />
                        <Periods formChange={form.change} />
                        <Rounding />
                        <h2>{i18n.t('Organisation units')}</h2>
                        <Divider />
                        <OrganisationUnits />
                        <h2>{i18n.t('Import setup')}</h2>
                        <Divider />
                        <AggregationType />
                        <DataElements />
                        <MappingTable />
                        <Divider />
                        <DataPreview />
                        <ImportButtonStrip form={form} />
                        <FormAlerts alerts={submitError} />
                    </form>
                )}
            ></Form>
        </Page>
    )
}

export { EarthEngineImportForm }
