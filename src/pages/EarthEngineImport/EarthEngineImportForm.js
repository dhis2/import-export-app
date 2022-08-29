import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, Divider, Button } from '@dhis2/ui'
import React, { useState, useContext, useRef } from 'react'
import { Page, DataIcon } from '../../components/index.js'
import { FormAlerts } from '../../components/Inputs/index.js'
import { TaskContext, getNewestTask } from '../../contexts/index.js'
import { ALL_AGGREGATION_TYPES } from './components/AggregationType.js'
import { AssociatedGeometry } from './components/AssociatedGeometry.js'
import { DataElements } from './components/DataElements.js'
import { DataPreview } from './components/DataPreview.js'
import { EarthEngineId } from './components/EarthEngineId.js'
import { MappingTable } from './components/MapGenderAgeGroupsTable.js'
import { OrganisationUnits } from './components/OrganisationUnits.js'
import { Periods } from './components/Periods.js'
import { Rounding, defaultRoundingOption } from './components/Rounding.js'
import { SubmitButtons } from './components/SubmitButtons.js'
import styles from './EarthEngineImportForm.module.css'
import { onImport } from './form-helper.js'
import { getPeriods, getAggregations } from './util/earthEngineHelper.js'
import getEarthEngineConfig from './util/earthEngineLoader.js'
import {
    POPULATION_AGE_GROUPS_DATASET_ID,
    getDefaultAggregation,
} from './util/earthEngines.js'
import {
    EARTH_ENGINE_ID,
    PERIOD,
    ORGANISATION_UNITS,
    ASSOCIATED_GEOMETRY,
    ROUNDING,
    DATA_ELEMENT_ID,
    BAND_COCS,
    getFormValues,
} from './util/getFormValues.js'
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
    const [fetching, setFetching] = useState(false)
    const [doSubmit, setDoSubmit] = useState(false)
    const [requestFailedMessage, setRequestFailedMessage] = useState(null)

    const hiddenTopElRef = useRef(null)

    const initialValues = {
        [ROUNDING]: defaultRoundingOption,
        [ORGANISATION_UNITS]: [],
        [DATA_ELEMENT_ID]: null,
    }

    const fetchEeData = async (formValues) => {
        // TODO - getFormValues should only be for bandCocs (e.g. getBandCocFormValues)
        const {
            earthEngineId,
            organisationUnits,
            associatedGeometry,
            period,
            rounding,
            ...bandCocs
        } = getFormValues(formValues, [
            EARTH_ENGINE_ID,
            ORGANISATION_UNITS,
            ASSOCIATED_GEOMETRY,
            PERIOD,
            ROUNDING,
            BAND_COCS,
        ])

        const getValueWithPrecision = getPrecisionFn(rounding)

        const aggregationType = getDefaultAggregation(earthEngineId)

        setDoSubmit(false)
        setFetching(true)
        setRequestFailedMessage(null)

        try {
            const periods = await getPeriods(earthEngineId, engine)

            const eeOptions = {
                id: earthEngineId,
                organisationUnits,
                period,
                periods,
                aggregationType,
                coordinateField: associatedGeometry,
                bandCocs,
            }

            const { config, pointOrgUnits } = await getEarthEngineConfig(
                eeOptions,
                engine
            )

            const data = await getAggregations(engine, config)

            const polygonOus =
                config.data?.map((d) => {
                    const { id, name, parentName } = d.properties
                    return {
                        id,
                        name,
                        parentName,
                    }
                }) || []

            const structuredData = Object.entries(data)
                .reduce((acc, [ouId, valueSet]) => {
                    if (Object.keys(bandCocs).length) {
                        Object.entries(valueSet).forEach(
                            ([bandId, rawValue]) => {
                                // TODO add comment explaining the next line
                                if (!ALL_AGGREGATION_TYPES.includes(bandId)) {
                                    const ouName = polygonOus.find(
                                        (ou) => ou.id === ouId
                                    )?.name
                                    acc.push({
                                        ouId,
                                        ouName,
                                        bandId,
                                        value: getValueWithPrecision(rawValue),
                                    })
                                }
                            }
                        )
                    } else {
                        const ouName = polygonOus.find(
                            (ou) => ou.id === ouId
                        )?.name
                        acc.push({
                            ouId,
                            ouName,
                            value: getValueWithPrecision(
                                valueSet[aggregationType]
                            ),
                        })
                    }

                    return acc
                }, [])
                .concat(
                    pointOrgUnits.map((ou) => ({
                        ouId: ou.id,
                        ouName: ou.name,
                        value: i18n.t('Point org. unit - no value'),
                        isNoValue: true,
                    }))
                )

            setEeData(structuredData)
            setFetching(false)
            setDoSubmit(true)
        } catch (error) {
            console.log('Error while fetching Earth Engine data', error)
            setEeData([])
            setFetching(false)
            const message = error.message || error

            let msg = i18n.t(
                'An error occurred while trying to fetch Earth Engine data'
            )

            if (message.includes('Output of image computation is too large')) {
                msg = i18n.t(
                    'The Earth Engine data set is too large. Try reducing the number of groups or organisation units'
                )
            } else if (
                message.includes(
                    'Dimension is present in query without any valid dimension options: `ou`'
                )
            ) {
                msg = i18n.t('The organisation units selection is invalid')
            } else if (message.length) {
                msg = msg.concat(`: ${message}`)
            }
            setRequestFailedMessage(msg)

            return
        }
    }

    const previewIsAllowed = ({ valid, values, modifiedSinceLastPreview }) => {
        // there should be at least one band for Population Age groups

        const { earthEngineId, ...bandCocs } = getFormValues(values, [
            EARTH_ENGINE_ID,
            BAND_COCS,
        ])

        const bandsValid =
            earthEngineId === POPULATION_AGE_GROUPS_DATASET_ID
                ? Object.keys(bandCocs).length
                : true

        const otherCheck = requestFailedMessage
            ? modifiedSinceLastPreview
            : true

        return valid && bandsValid && otherCheck
    }

    const wrappedSetShowFullSummaryTask = (val) => {
        setShowFullSummaryTask(val)
        hiddenTopElRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const onImportInternal = onImport({
        engine,
        setProgress,
        addTask,
        setShowFullSummaryTask: wrappedSetShowFullSummaryTask,
    })

    const onSubmit = (values) => {
        if (doSubmit) {
            onImportInternal({ eeData, ...values })
        }
    }

    const getAlerts = (submitError) => {
        const internalErrors = []
        if (requestFailedMessage) {
            internalErrors.push({
                id: 'getEeDataFailed',
                message: requestFailedMessage,
                critical: true,
                info: false,
                warning: false,
            })
        }
        return Array.isArray(submitError)
            ? submitError.concat(internalErrors)
            : internalErrors
    }

    return (
        <>
            <div ref={hiddenTopElRef} className={styles.hiddenTopElement}></div>
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
                            <div className={styles.wrapper}>
                                <h2>{i18n.t('Earth Engine source')}</h2>
                                <Divider />
                                <EarthEngineId />
                                <Periods formChange={form.change} />
                                <Rounding />
                                <h2>{i18n.t('Organisation units')}</h2>
                                <Divider />
                                <OrganisationUnits />
                                <AssociatedGeometry />
                                <h2>{i18n.t('Import setup')}</h2>
                                <Divider />
                                <DataElements />
                                <MappingTable formChange={form.change} />
                                <FormSpy
                                    subscription={{
                                        values: true,
                                        valid: true,
                                        modifiedSinceLastSubmit: true,
                                    }}
                                >
                                    {({
                                        valid,
                                        values,
                                        modifiedSinceLastSubmit,
                                    }) => (
                                        <Button
                                            primary
                                            type="submit"
                                            disabled={
                                                !previewIsAllowed({
                                                    valid,
                                                    values,
                                                    modifiedSinceLastPreview:
                                                        modifiedSinceLastSubmit,
                                                })
                                            }
                                            onClick={() => fetchEeData(values)}
                                        >
                                            {i18n.t('Preview before import')}
                                        </Button>
                                    )}
                                </FormSpy>
                                <FormSpy
                                    subscription={{
                                        modifiedSinceLastSubmit: true,
                                    }}
                                >
                                    {({ modifiedSinceLastSubmit }) => (
                                        <>
                                            <DataPreview
                                                modifiedSinceLastPreview={
                                                    modifiedSinceLastSubmit
                                                }
                                                fetching={fetching}
                                                eeData={eeData}
                                            />
                                            <SubmitButtons
                                                form={form}
                                                modifiedSinceLastPreview={
                                                    modifiedSinceLastSubmit
                                                }
                                                fetching={fetching}
                                                hasData={!!eeData.length}
                                            />
                                        </>
                                    )}
                                </FormSpy>
                                <FormAlerts alerts={getAlerts(submitError)} />
                            </div>
                        </form>
                    )}
                ></Form>
            </Page>
        </>
    )
}

export { EarthEngineImportForm }
