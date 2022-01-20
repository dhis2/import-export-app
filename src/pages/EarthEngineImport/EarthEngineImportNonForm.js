import { useDataQuery, useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    OrgUnitDimension,
    apiFetchOrganisationUnitRoots,
} from '@dhis2/analytics'
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
import { getPeriods, getAggregations } from './earthEngineHelper'
import getEarthEngineConfig from './earthEngineLoader'
import {
    getEarthEngineLayers,
    ELEVATION_ID,
    POPULATION_AGE_GROUPS_ID,
} from './earthEngines'
import NumberPrecisionSelect from './NumberPrecisionSelect'
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
    .filter(({ legacy }) => !legacy)
    .map(({ name, datasetId }) => ({
        label: name,
        value: datasetId,
    }))

const EarthEngineImport = () => {
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
    const engine = useDataEngine()
    const { loading, data, error } = useDataQuery(dataSetQuery)

    useEffect(() => {
        const fetchData = async () => {
            const periodsForLayer = await getPeriods(eeLayer, engine)
            setPeriods(periodsForLayer)

            const orgUnits = await apiFetchOrganisationUnitRoots(engine)
            setRootOrgUnits(orgUnits.map(ou => ou.id))
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (data?.datasets) {
            setDataSets(
                data.datasets.dataSets.map(({ id, name, dataSetElements }) => ({
                    label: name,
                    value: id,
                    dataSetElements,
                }))
            )
        }
    }, [data])

    useEffect(() => {
        const updatePeriod = async () => {
            let periodsForLayer
            if (eeLayer === ELEVATION_ID) {
                const currentYear = new Date().getFullYear().toString()
                periodsForLayer = [{ label: currentYear, value: currentYear }]
            } else {
                periodsForLayer = await getPeriods(eeLayer, engine)
            }
            setPeriod('')
            setPeriods(periodsForLayer)

            if ([POPULATION_AGE_GROUPS_ID, ELEVATION_ID].includes(eeLayer)) {
                setPeriod(periodsForLayer[0].value)
            }
        }

        updatePeriod()
    }, [eeLayer])

    const dataSetChanged = ({ selected }) => {
        const selectedDataSet = dataSets.find(s => s.value == selected)
        const dsElements = selectedDataSet.dataSetElements.map(
            ({ dataElement }) => ({
                label: dataElement.name,
                value: dataElement.id,
            })
        )
        setCurrentDS(selected)
        setDataSetElements(dsElements)
    }

    const orgUnitsSelected = ({ items }) => setOrgUnits(items)
    const dataElementChanged = ({ selected }) => setCurrentDE(selected)
    const numberPrecisionChanged = ({ selected }) => console.log(selected)
    const layerChanged = async ({ selected }) => setEeLayer(selected)
    const periodChanged = ({ selected }) => setPeriod(selected)

    const showData = async () => {
        const displayProperty = 'NAME'

        const config = {
            id: eeLayer,
            rows: orgUnits,
            filter: periods.find(p => period === p.name),
        }

        const eeConfig = await getEarthEngineConfig(
            config,
            engine,
            displayProperty
        )
        console.log('eeConfig final', eeConfig)
        // const res = getAggregations()
        // setEeData(res)
        getAggregations(engine, eeConfig).then(aggregations =>
            setEeData(JSON.stringify(aggregations))
        )
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
                    <div className={styles.orgUnitContainer}>
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

                {eeData && (
                    <div className={styles.row}>
                        <p>{eeData}</p>
                    </div>
                )}

                <div className={styles.row}>
                    <Button name="showData" onClick={showData} value="default">
                        Fetch EE data
                    </Button>
                </div>
            </div>
        </Page>
    )
}

export { EarthEngineImport }
