import {
    OrgUnitDimension,
    apiFetchOrganisationUnitRoots,
} from '@dhis2/analytics'
import { useDataQuery, useDataEngine, useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    SingleSelectField as SingleSelect,
    SingleSelectOption,
    Button,
    ComponentCover,
    CenteredContent,
    CircularLoader,
} from '@dhis2/ui'
import React, { useState, useEffect } from 'react'
import { Page } from '../../components/index'
// import DataPreview from './DataPreview'
import {
    getPeriods,
    getAggregations,
    fetchUserSettings,
} from './earthEngineHelper'
import getEarthEngineConfig from './earthEngineLoader'
import {
    getEarthEngineLayers,
    getEarthEngineLayer,
    POPULATION_DATASET_ID,
    POPULATION_AGE_GROUPS_DATASET_ID,
} from './earthEngines'
import { getAggregationTypes } from './getAggregationTypes'
import NumberPrecisionSelect from './NumberPrecisionSelect'
import { postDataWithEngine, postDataWithFetch } from './postData'
import styles from './styles/EarthEngineImport.module.css'

const dataSetQuery = {
    datasets: {
        resource: 'dataSets',
        params: {
            fields: 'id,name,dataSetElements[dataElement[name,id]]',
            paging: 'false',
        },
    },
}

const eeLayers = getEarthEngineLayers()
    .filter(({ datasetId }) => {
        return [
            POPULATION_AGE_GROUPS_DATASET_ID,
            POPULATION_DATASET_ID,
        ].includes(datasetId)
    })
    .map(({ name, datasetId }) => ({
        label: name,
        value: datasetId,
    }))

const getAggregationTypesForLayer = id => {
    const types = [
        { value: 'min', label: i18n.t('Min') },
        { value: 'max', label: i18n.t('Max') },
        { value: 'mean', label: i18n.t('Mean') },
        { value: 'median', label: i18n.t('Median') },
        { value: 'sum', label: i18n.t('Sum') },
        {
            value: 'stdDev',
            // label: i18n.t('Standard deviation'),
            label: i18n.t('Std dev'),
        },
        { value: 'variance', label: i18n.t('Variance') },
    ]
    const aggs = getEarthEngineLayer(id).aggregations || getAggregationTypes()

    return types.filter(type => aggs.includes(type.value))
}

const getFirstDefaultAggregation = id => {
    const defAggregations = getEarthEngineLayer(id).defaultAggregations
    return Array.isArray(defAggregations) ? defAggregations[0] : defAggregations
}

const EarthEngineImport = () => {
    const [displayNameProperty, setDisplayNameProperty] = useState(null)
    const [orgUnits, setOrgUnits] = useState([])
    const [rootOrgUnits, setRootOrgUnits] = useState(null)
    const [eeData, setEeData] = useState(null)
    const [eeLayer, setEeLayer] = useState(eeLayers[0].value)
    const [currentDS, setCurrentDS] = useState('')
    const [currentDE, setCurrentDE] = useState('')
    const [dataSets, setDataSets] = useState([])
    const [dataSetElements, setDataSetElements] = useState([])
    const [periods, setPeriods] = useState([])
    const [period, setPeriod] = useState('')
    const [aggregation, setAggregation] = useState('')
    const engine = useDataEngine()
    const { baseUrl } = useConfig()
    const { loading, data, error } = useDataQuery(dataSetQuery)

    useEffect(() => {
        const fetchData = async () => {
            const periodsForLayer = await getPeriods(eeLayer, engine)
            setPeriods(periodsForLayer)

            const orgUnits = await apiFetchOrganisationUnitRoots(engine)
            setRootOrgUnits(orgUnits.map(ou => ou.id))

            const userSettings = await fetchUserSettings(engine)
            setDisplayNameProperty(userSettings.keyAnalysisDisplayProperty)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (data?.datasets) {
            setDataSets(
                data.datasets.dataSets.map(({ id, name, dataSetElements }) => ({
                    label: name,
                    value: id,
                    id,
                    dataSetElements,
                }))
            )
        }
    }, [data])

    useEffect(() => {
        const updatePeriod = async () => {
            let periodsForLayer
            // if (eeLayer === ELEVATION_ID) {
            //     const currentYear = new Date().getFullYear().toString()
            //     periodsForLayer = [{ label: currentYear, value: currentYear }]
            // } else {
            periodsForLayer = await getPeriods(eeLayer, engine)
            // }
            setPeriods(periodsForLayer)
            setPeriod(periodsForLayer[0].value)
        }

        updatePeriod()
        setAggregation(getFirstDefaultAggregation(eeLayer))
    }, [eeLayer])

    const dataSetChanged = ({ selected }) => {
        const selectedDataSet = dataSets.find(s => s.value == selected)
        const dsElements = selectedDataSet.dataSetElements.map(
            ({ dataElement }) => ({
                label: dataElement.name,
                value: dataElement.id,
                id: dataElement.id,
            })
        )
        setCurrentDS(selected)
        setDataSetElements(dsElements)
    }

    const orgUnitsSelected = selected => setOrgUnits(selected.items)
    const dataElementChanged = ({ selected }) => setCurrentDE(selected)
    const numberPrecisionChanged = ({ selected }) => console.log(selected)
    const layerChanged = async ({ selected }) => {
        setPeriod('')
        setAggregation('')
        setEeLayer(selected)
    }
    const periodChanged = ({ selected }) => setPeriod(selected)
    const aggregationTypeChanged = ({ selected }) => setAggregation(selected)

    const showData = async () => {
        const data = {
            id: eeLayer,
            rows: orgUnits,
            filter: periods.filter(p => period === p.name),
            aggregationType: [aggregation],
        }
        const config = await getEarthEngineConfig(
            data,
            engine,
            displayNameProperty
        )
        // getAggregations(engine, config)
        //     .then(aggregations => setEeData(JSON.stringify(aggregations)))
        //     .catch(e => {
        //         // TODO handle the error in a better way
        //         console.log('something went wrong', e)
        //     })
    }

    const importData = async () => {
        const data = {
            id: eeLayer,
            rows: orgUnits,
            filter: periods.filter(p => period === p.name),
            aggregationType: [aggregation],
        }
        const config = await getEarthEngineConfig(
            data,
            engine,
            displayNameProperty
        )

        const aggregations = await getAggregations(engine, config)
        setEeData(JSON.stringify(aggregations))
        // await postDataWithEngine(engine, {data: aggregations, dataSet: currentDS, dataElement: currentDE, period, orgUnits})
        await postDataWithFetch({
            data: aggregations,
            // dataSet: currentDS,
            dataElement: currentDE,
            period,
            orgUnits,
            valueType: aggregation,
            baseUrl,
        })
        // .catch(e => {
        //     // TODO handle the error in a better way
        //     console.log('something went wrong', e)
        // })
    }

    return (
        <Page
            title={i18n.t('Earth Engine Import')}
            desc={i18n.t('Import Earth Engine data')}
            // icon={PAGE_ICON}
            // loading={progress}
            dataTest="page-import-earthengine"
            // summaryTask={getNewestTask(dataTasks)}
            // showFullSummaryTask={showFullSummaryTask}
        >
            <div>
                <div className={styles.row}>
                    <SingleSelect
                        name="eelayer"
                        label="Earth Engine"
                        className={styles.eelayer}
                        selected={eeLayer}
                        onChange={layerChanged}
                    >
                        {eeLayers.map(({ label, value }) => (
                            <SingleSelectOption
                                key={value}
                                value={value}
                                label={label}
                            />
                        ))}
                    </SingleSelect>
                </div>

                <div className={styles.row}>
                    <SingleSelect
                        name="periods"
                        label="Periods"
                        className={styles.periods}
                        onChange={periodChanged}
                        selected={period}
                    >
                        {periods.map(({ label, value }, i) => (
                            <SingleSelectOption
                                key={`${value}-${i}`}
                                value={value}
                                label={label}
                            />
                        ))}
                    </SingleSelect>
                </div>

                <div className={styles.row}>
                    <SingleSelect
                        name="aggregationTypes"
                        label="Aggregation type"
                        className={styles.aggregationTypes}
                        onChange={aggregationTypeChanged}
                        selected={aggregation}
                    >
                        {getAggregationTypesForLayer(eeLayer).map(
                            ({ label, value }, i) => (
                                <SingleSelectOption
                                    key={`${value}-${i}`}
                                    value={value}
                                    label={label}
                                />
                            )
                        )}
                    </SingleSelect>
                </div>

                <div className={styles.row}>
                    <div className={styles.orgUnitContainer}>
                        <p>{i18n.t('Organisation units')}</p>
                        {!rootOrgUnits ? (
                            <ComponentCover translucent>
                                <CenteredContent>
                                    <CircularLoader />
                                </CenteredContent>
                            </ComponentCover>
                        ) : (
                            <OrgUnitDimension
                                roots={rootOrgUnits}
                                selected={orgUnits}
                                onSelect={orgUnitsSelected}
                                showUserOrgUnits={false}
                            />
                        )}
                    </div>
                </div>

                <hr />
                <div className={styles.row}>
                    <SingleSelect
                        name="dataset"
                        label="Data Set"
                        className={styles.dataset}
                        onChange={dataSetChanged}
                        selected={currentDS}
                    >
                        {dataSets.map(({ label, value }) => (
                            <SingleSelectOption
                                key={value}
                                value={value}
                                label={label}
                            />
                        ))}
                    </SingleSelect>
                </div>

                <div className={styles.row}>
                    <SingleSelect
                        name="dataelement"
                        label="Data Element"
                        className={styles.dataelement}
                        selected={currentDE}
                        onChange={dataElementChanged}
                    >
                        {dataSetElements.map(({ label, value }) => (
                            <SingleSelectOption
                                key={value}
                                value={value}
                                label={label}
                            />
                        ))}
                    </SingleSelect>
                </div>

                <div className={styles.row}>
                    <NumberPrecisionSelect
                        onChange={numberPrecisionChanged}
                        precision={1}
                    />
                </div>

                <hr />

                {eeData && (
                    <div className={styles.row}>
                        <p>{eeData}</p>
                        {/* <DataPreview
                            dataSet={dataSets.find(ds => ds.id === currentDS)}
                            orgUnits={orgUnits}
                            period={period}
                            valueType={aggregation}
                            dataElement={dataSetElements.find(
                                de => de.id === currentDE
                            )}
                            data={eeData}
                        /> */}
                    </div>
                )}

                <div className={styles.row}>
                    <Button name="preview" onClick={showData} value="default">
                        Preview
                    </Button>
                    <Button name="import" onClick={importData} value="default">
                        Import
                    </Button>
                </div>
            </div>
        </Page>
    )
}

export { EarthEngineImport }
