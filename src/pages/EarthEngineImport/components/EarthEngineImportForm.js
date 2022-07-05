import { useDataEngine, useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, Divider } from '@dhis2/ui'
// import cx from 'classnames'
import React, { useState } from 'react'
import { Page } from '../../../components/index.js'
import {
    FormAlerts,
    ImportButtonStrip,
} from '../../../components/Inputs/index.js'
import { onImport } from '../form-helper.js'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'
import { AggregationType } from './AggregationType.js'
// import { Tooltip } from './ButtonTooltip.js'
import { DataElementGroup } from './DataElementGroup.js'
import { DataElements } from './DataElements.js'
import { DataPreview } from './DataPreview.js'
import { EarthEngineId } from './EarthEngineId.js'
import { MappingTable } from './MapGenderAgeGroupsTable.js'
import { OrganisationUnits } from './OrganisationUnits.js'
import { Periods } from './Periods.js'
import { Rounding, defaultRoundingOption } from './Rounding.js'
// import { ActionButtons } from './ActionButtons.js'
// import styles from './styles/EarthEngineImportForm.module.css'

const { Form } = ReactFinalForm

const EarthEngineImportForm = () => {
    const engine = useDataEngine()
    const { baseUrl } = useConfig()
    const { userSettings } = useCachedDataQuery()

    // resulting data and display options
    const [showPreview, setShowPreview] = useState(false)

    const showData = (e) => {
        console.log('e', e)
        e.preventDefault()
        e.stopPropagation()
        setShowPreview(true)
    }

    const isMissingRequiredInputs = () => {
        return false
        // return !eeId || !period || !orgUnits || !aggregation || !dataElement
    }

    const clearEeData = () => {
        setShowPreview(false)
        // setEeData(null)
        window.scrollTo(0, 0)
    }

    const initialValues = {
        rounding: defaultRoundingOption,
        organisationUnits: [],
        dataElement: null,
    }

    const onSubmit = onImport({
        engine,
        baseUrl,
        userSettings,
        // setProgress,
        // addTask,
        // setShowFullSummaryTask,
    })

    return (
        <Page
            title={i18n.t('Earth Engine import')}
            desc={i18n.t(
                'Import Earth Engine data to data sets and data elements'
            )}
            // icon={PAGE_ICON}
            // loading={progress}
            dataTest="page-import-earthengine"
            // summaryTask={getNewestTask(dataTasks)}
            // showFullSummaryTask={showFullSummaryTask}
        >
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                render={({ handleSubmit, form, submitError }) => (
                    <form onSubmit={handleSubmit}>
                        <h2>{i18n.t('Earth Engine source')}</h2>
                        <Divider />
                        <EarthEngineId />
                        <Periods form={form} />
                        <Rounding />
                        <h2>{i18n.t('Organisation units')}</h2>
                        <Divider />
                        <OrganisationUnits />
                        <h2>{i18n.t('Import setup')}</h2>
                        <Divider />
                        <AggregationType />
                        <DataElements />
                        <DataElementGroup />
                        <MappingTable />
                        <Divider />
                        <DataPreview />
                        <ImportButtonStrip form={form} />
                        {/* <ActionButtons form={form} /> */}
                        <FormAlerts alerts={submitError} />
                    </form>
                )}
            ></Form>
        </Page>
    )
}

export { EarthEngineImportForm }
