import {
    OrgUnitDimension,
    apiFetchOrganisationUnitRoots,
} from '@dhis2/analytics'
import cx from 'classnames'
import { useDataQuery, useDataEngine, useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    SingleSelectField as SingleSelect,
    SingleSelectOption,
    Button,
    ComponentCover,
    CenteredContent,
    CircularLoader,
    Divider,
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
import { postDataWithEngine, postDataWithFetch } from './postData'
import MappingTable from './MapGenderAgeGroupsTable'
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

const NO_VALUE = ''

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

const roundings = [
    { label: i18n.t("Don't round source values"), value: 'noround' },
    { label: i18n.t('Round to 0 decimal places'), value: 'round0' },
    { label: i18n.t('Round to 1 decimal place'), value: 'round1' },
    { label: i18n.t('Round to 2 decimal places'), value: 'round2' },
    { label: i18n.t('Round to 3 decimal places'), value: 'round3' },
    { label: i18n.t('Round to 4 decimal places'), value: 'round4' },
    { label: i18n.t('Round to 5 decimal places'), value: 'round5' },
    { label: i18n.t('Round to 6 decimal places'), value: 'round6' },
]

const EarthEngineImport = () => {
    // options
    const [displayNameProperty, setDisplayNameProperty] = useState(null)
    const [rootOrgUnits, setRootOrgUnits] = useState(null)
    const [periods, setPeriods] = useState([])
    const [dataSets, setDataSets] = useState([])
    const [dataSetElements, setDataSetElements] = useState([])

    // user selections
    const [eeLayer, setEeLayer] = useState(eeLayers[1].value)
    const [period, setPeriod] = useState(NO_VALUE)
    const [orgUnits, setOrgUnits] = useState([])
    const [currentDS, setCurrentDS] = useState(NO_VALUE)
    const [currentDE, setCurrentDE] = useState(NO_VALUE)
    const [aggregation, setAggregation] = useState(NO_VALUE)
    const [rounding, setRounding] = useState('noround')

    // resulting data
    const [eeData, setEeData] = useState(null)

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
            periodsForLayer = await getPeriods(eeLayer, engine)
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
    const roundingChanged = ({ selected }) => setRounding(selected)

    const dataElementChanged = ({ selected }) => {
        setCurrentDE(selected)
    }

    const layerChanged = async ({ selected }) => {
        setPeriod(NO_VALUE)
        setAggregation(NO_VALUE)
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

        const aggregations = await getAggregations(engine, config)
        setEeData(JSON.stringify(aggregations))
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
            <div>
                <h2>{i18n.t('Earth Engine source')}</h2>
                <Divider />
                <div className={styles.row}>
                    <SingleSelect
                        name="eelayer"
                        label={i18n.t('Earth Engine data set')}
                        className={styles.eelayer}
                        selected={eeLayer}
                        onChange={layerChanged}
                        inputWidth="350px"
                        helpText={i18n.t(
                            'Not all Earth Engine data sets are available yet.'
                        )}
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
                        label={i18n.t('Period')}
                        className={styles.periods}
                        onChange={periodChanged}
                        selected={period}
                        inputWidth="200px"
                        helpText={i18n.t(
                            'Data from Earth Engine will be imported for this period.'
                        )}
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
                        name="rounding"
                        label={i18n.t('Value rounding')}
                        className={styles.rounding}
                        onChange={roundingChanged}
                        selected={rounding}
                        inputWidth="300px"
                    >
                        {roundings.map(({ label, value }, i) => (
                            <SingleSelectOption
                                key={`${value}-${i}`}
                                value={value}
                                label={label}
                            />
                        ))}
                    </SingleSelect>
                </div>

                <h2>{i18n.t('Organisation units')}</h2>
                <Divider />
                <div className={styles.row}>
                    <div className={styles.orgUnitContainer}>
                        {!rootOrgUnits ? (
                            <ComponentCover>
                                <CenteredContent>
                                    <CircularLoader />
                                </CenteredContent>
                            </ComponentCover>
                        ) : (
                            <OrgUnitDimension
                                className="jennifer"
                                roots={rootOrgUnits}
                                selected={orgUnits}
                                onSelect={orgUnitsSelected}
                                showUserOrgUnits={false}
                            />
                        )}
                    </div>
                </div>

                <h2>{i18n.t('Import setup')}</h2>
                <Divider />
                <div className={styles.row}>
                    <SingleSelect
                        name="aggregationTypes"
                        label="Aggregation type"
                        className={styles.aggregationTypes}
                        onChange={aggregationTypeChanged}
                        selected={aggregation}
                        inputWidth="200px"
                        helpText={i18n.t(
                            'How the values will be aggregated for output and analysis.'
                        )}
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
                <div className={cx(styles.row, styles.set)}>
                    <SingleSelect
                        name="dataset"
                        label={i18n.t('Data Set')}
                        className={styles.dataset}
                        onChange={dataSetChanged}
                        selected={currentDS}
                        inputWidth="300px"
                        helpText={i18n.t(
                            'Select data set to filter data elements'
                        )}
                    >
                        {dataSets.map(({ label, value }) => (
                            <SingleSelectOption
                                key={value}
                                value={value}
                                label={label}
                            />
                        ))}
                    </SingleSelect>
                    <SingleSelect
                        name="dataelement"
                        label={i18n.t('Destination data element')}
                        className={styles.dataelement}
                        selected={currentDE}
                        onChange={dataElementChanged}
                        inputWidth="350px"
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
                    {eeLayer && currentDE && <MappingTable layerId={eeLayer} />}
                </div>

                <Divider />

                {/* {eeData && (
                    <div className={styles.row}>
                        <p>{eeData}</p>
                        <DataPreview
                            // dataSet={dataSets.find(ds => ds.id === currentDS)}
                            orgUnits={orgUnits}
                            period={period}
                            valueType={aggregation}
                            dataElement={dataSetElements.find(
                                de => de.id === currentDE
                            )}
                            data={eeData}
                        />
                    </div>
                )} */}

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
