import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, Divider, Button } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState, useContext } from 'react'
import { Page, DataIcon } from '../../components/index.js'
import { FormAlerts, ImportButtonStrip } from '../../components/Inputs/index.js'
import { TaskContext, getNewestTask } from '../../contexts/index.js'
import { ActionButtons } from './components/ActionButtons.js'
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
import { useCachedDataQuery } from './util/CachedQueryProvider.js'
import { getPeriods, getAggregations } from './util/earthEngineHelper.js'
import getEarthEngineConfig from './util/earthEngineLoader.js'
import { getPrecisionFn } from './util/getPrecisionFn.js'
// import { getEarthEngineConfigs } from './util/earthEngines.js'
// import styles from './styles/EarthEngineImportForm.module.css'

const { Form, FormSpy } = ReactFinalForm

const EarthEngineImportForm = () => {
    const {
        tasks: { earthengine: earthengineTasks },
        addTask,
    } = useContext(TaskContext)
    const engine = useDataEngine()
    const { displayProperty } = useCachedDataQuery()

    // resulting data and display options
    const [progress, setProgress] = useState(false)
    const [showFullSummaryTask, setShowFullSummaryTask] = useState(false)
    const [eeData, setEeData] = useState([])
    const [dataElementId, setDataElementId] = useState(null)

    const initialValues = {
        rounding: defaultRoundingOption,
        organisationUnits: [],
        dataElement: null,
    }

    const showPreview = async (formValues) => {
        const {
            earthEngineId,
            organisationUnits,
            period,
            rounding,
            dataElement: deId, // have to keep this out of bandCocs
            aggregationType,
            ...bandCocs
        } = formValues
        // console.log('showPreview with', formValues)
        console.log('deId', deId)

        const getValueWithPrecision = getPrecisionFn(rounding)

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

        const config = await getEarthEngineConfig(
            eeOptions,
            engine,
            displayProperty
        )

        const data = await getAggregations(engine, config)

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

        setDataElementId(deId)
        setEeData(structuredData)
    }

    // const setInternalFormState = ({ values, valid }) => {
    //     if (!valid) {
    //         return
    //     }

    //     const {
    //         earthEngineId,
    //         organisationUnits,
    //         period,
    //         rounding,
    //         dataElement,
    //         aggregationType,
    //         ...bandCocs
    //     } = values

    //     const bands = getEarthEngineConfigs(earthEngineId)?.bands || []
    //     console.log(
    //         'form changed',
    //         earthEngineId,
    //         organisationUnits,
    //         period,
    //         rounding,
    //         dataElement,
    //         aggregationType,
    //         Object.keys(bandCocs).length,
    //         bands.length
    //     )

    //     if (
    //         earthEngineId &&
    //         organisationUnits &&
    //         period &&
    //         rounding &&
    //         dataElement &&
    //         aggregationType &&
    //         Object.keys(bandCocs).length === bands.length
    //     ) {
    //         console.log('congrats you can generate data now')
    //         if (!formIsValid) {
    //             setFormIsValid(true)
    //         }
    //         setEeConfig(values)
    //     } else {
    //         if (formIsValid) {
    //             setFormIsValid(false)
    //         }
    //         if (eeConfig !== null) {
    //             setEeConfig(null)
    //         }
    //     }
    // }

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
                                    disabled={!valid}
                                    onClick={() => showPreview(values)}
                                >
                                    {i18n.t('Preview before import')}
                                </Button>
                            )}
                        </FormSpy>
                        {eeData.length ? (
                            <DataPreview
                                dataElementId={dataElementId}
                                eeData={eeData}
                            />
                        ) : null}
                        {eeData.length ? <ActionButtons form={form} /> : null}
                        <FormAlerts alerts={submitError} />
                    </form>
                )}
            ></Form>
        </Page>
    )
}

export { EarthEngineImportForm }
