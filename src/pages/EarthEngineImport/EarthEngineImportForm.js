import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, Divider, Button } from '@dhis2/ui'
import React, { useState, useContext } from 'react'
import { Page, DataIcon } from '../../components/index.js'
import { FormAlerts, ImportButtonStrip } from '../../components/Inputs/index.js'
import { TaskContext, getNewestTask } from '../../contexts/index.js'
import {
    ALL_AGGREGATION_TYPES,
    AggregationType,
} from './components/AggregationType.js'
import { DataElements } from './components/DataElements.js'
import { DataPreview } from './components/DataPreview.js'
import { EarthEngineId } from './components/EarthEngineId.js'
import { MappingTable } from './components/MapGenderAgeGroupsTable.js'
import { OrganisationUnits } from './components/OrganisationUnits.js'
import { Periods } from './components/Periods.js'
import { Rounding, defaultRoundingOption } from './components/Rounding.js'
import { onImport } from './form-helper.js'
import { getPeriods, getAggregations } from './util/earthEngineHelper.js'
import getEarthEngineConfig from './util/earthEngineLoader.js'
import { getPrecisionFn } from './util/getPrecisionFn.js'

const { Form, FormSpy } = ReactFinalForm

const EarthEngineImportForm = () => {
    const {
        tasks: { earthengine: earthengineTasks },
        addTask,
    } = useContext(TaskContext)
    const engine = useDataEngine()

    // resulting data and display options
    const [progress, setProgress] = useState(false)
    const [showFullSummaryTask, setShowFullSummaryTask] = useState(false)
    const [eeData, setEeData] = useState([])
    const [showPreview, setShowPreview] = useState(false)
    const [fetching, setFetching] = useState(false)

    const initialValues = {
        rounding: defaultRoundingOption,
        organisationUnits: [],
        dataElement: null,
    }

    const fetchEeData = async (formValues) => {
        //TODO - when the form changes and the preview is already showing, the preview needs to be removed.
        const {
            earthEngineId,
            organisationUnits,
            period,
            rounding,
            aggregationType,
            dataElement, //eslint-disable-line no-unused-vars
            ...bandCocs
        } = formValues
        const getValueWithPrecision = getPrecisionFn(rounding)

        setFetching(true)
        setShowPreview(true)

        const periods = await getPeriods(earthEngineId, engine)

        const eeOptions = {
            id: earthEngineId,
            rows: organisationUnits,
            filter: periods.filter((p) => period === p.name),
            aggregationType: [aggregationType],
        }

        if (Object.keys(bandCocs).length) {
            eeOptions.band = Object.keys(bandCocs)
        }

        const config = await getEarthEngineConfig(eeOptions, engine)

        let data = {}
        try {
            data = await getAggregations(engine, config)
        } catch (error) {
            console.log('error thrown', error)
            setEeData([])
            setFetching(false)
            setShowPreview(false)
            const message = error.message || error

            // if (message.includes('memory limit exceeded')) {
            if (message.includes('Output of image computation is too large')) {
                // show message to select fewer ous or bands
            }

            return
        }

        const structuredData = Object.entries(data).reduce(
            (acc, [ouId, valueSet]) => {
                if (Object.keys(bandCocs).length) {
                    Object.entries(valueSet).forEach(([bandId, rawValue]) => {
                        if (!ALL_AGGREGATION_TYPES.includes(bandId)) {
                            const ouName = organisationUnits.find(
                                (ou) => ou.id === ouId
                            )?.name
                            acc.push({
                                ouId,
                                ouName,
                                bandId,
                                value: getValueWithPrecision(rawValue),
                            })
                        }
                    })
                } else {
                    const ouName = organisationUnits.find(
                        (ou) => ou.id === ouId
                    )?.name
                    acc.push({
                        ouId,
                        ouName,
                        value: getValueWithPrecision(valueSet[aggregationType]),
                    })
                }

                return acc
            },
            []
        )

        setEeData(structuredData)
        setFetching(false)
    }

    const onImportInternal = onImport({
        engine,
        setProgress,
        addTask,
        setShowFullSummaryTask,
    })

    const onSubmit = (values) => {
        onImportInternal({ eeData, ...values })
    }

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
                keepDirtyOnReinitialize
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
                        <FormSpy subscription={{ values: true, valid: true }}>
                            {({ valid, values }) => (
                                <Button
                                    primary
                                    type="button"
                                    disabled={!valid || showPreview}
                                    onClick={() => fetchEeData(values)}
                                >
                                    {i18n.t('Preview before import')}
                                </Button>
                            )}
                        </FormSpy>
                        {showPreview && (
                            <DataPreview fetching={fetching} eeData={eeData} />
                        )}
                        {!fetching && eeData.length ? (
                            <ImportButtonStrip form={form} />
                        ) : null}
                        <FormAlerts alerts={submitError} />
                    </form>
                )}
            ></Form>
        </Page>
    )
}

export { EarthEngineImportForm }
