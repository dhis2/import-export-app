import { useDataEngine, useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    ReactFinalForm,
    Button,
    Divider,
    // NoticeBox,
} from '@dhis2/ui'
// import cx from 'classnames'
import React, { useState } from 'react'
import { Page } from '../../../components/index'
import { FormAlerts, ImportButtonStrip } from '../../../components/Inputs/index'
import { onImport } from '../form-helper'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'
// import { getAggregations } from '../util/earthEngineHelper'
// import getEarthEngineConfig from '../util/earthEngineLoader'
// import { POPULATION_AGE_GROUPS_DATASET_ID } from '../util/earthEngines'
// import { postDataWithFetch } from '../util/postData'
import { AggregationType } from './AggregationType'
// import { Tooltip } from './ButtonTooltip.js'
import { DataElementCategory } from './DataElementCategory'
import { DataElements } from './DataElements'
import { DataPreview } from './DataPreview'
import { EarthEngineId } from './EarthEngineId'
import { MappingTable } from './MapGenderAgeGroupsTable'
import { OrganisationUnits } from './OrganisationUnits'
import { Periods } from './Periods'
import { Rounding, defaultRoundingOption } from './Rounding'
import styles from './styles/EarthEngineImportForm.module.css'
import { usePeriods } from './usePeriods'

const { Form } = ReactFinalForm

const EarthEngineImportForm = () => {
    const engine = useDataEngine()
    const { baseUrl } = useConfig()
    const { periods } = usePeriods()
    const { userSettings } = useCachedDataQuery()

    // resulting data and display options
    // const [eeData, setEeData] = useState(null)
    const [showPreview, setShowPreview] = useState(false)

    const showData = e => {
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
        dataElements: null,
    }

    const onSubmit = onImport({
        engine,
        baseUrl,
        userSettings,
        periods,
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
                        <DataElementCategory />
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
