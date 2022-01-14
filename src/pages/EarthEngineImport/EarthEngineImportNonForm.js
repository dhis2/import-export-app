import { useDataQuery, useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
// import { loadEarthEngineWorker } from '@dhis2/maps-gl'
import {
    // ReactFinalForm,
    // SingleSelectFieldFF,
    // composeValidators,
    // createEqualTo,
    // hasValue,
    SingleSelectField as SingleSelect,
    SingleSelectOption,
} from '@dhis2/ui'
import React, { useState, useEffect } from 'react'
import {
    Page,
    // WithAuthority,
    // BasicOptions,
    // MoreOptions,
    // SchemeContainer,
    // DataIcon,
    // ValidationSummary,
} from '../../components/index'
import { ImportButtonStrip } from '../../components/Inputs/index'
import { getPeriods } from './earthEngineHelper'
import {
    getEarthEngineLayers,
    getEarthEngineLayer,
    ELEVATION_ID,
    POPULATION_AGE_GROUPS_ID,
} from './earthEngines'
import NumberPrecisionSelect from './NumberPrecisionSelect'
import styles from './styles/EarthEngineImport.module.css'

const alertValues = values => {
    const formattedValuesString = JSON.stringify(values, null, 2)
    alert(formattedValuesString)
}

let workerPromise

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
    const [eeLayer, setEeLayer] = useState(eeLayers[0].value)
    const [currentDS, setCurrentDS] = useState(null)
    const [currentDE, setCurrentDE] = useState(null)
    const [dataSets, setDataSets] = useState([])
    const [dataSetElements, setDataSetElements] = useState([])
    const [periods, setPeriods] = useState([])
    const [period, setPeriod] = useState(null)
    const engine = useDataEngine()
    const { loading, data, error } = useDataQuery(dataSetQuery)

    useEffect(() => {
        const generatePeriods = async () => {
            const periodsForLayer = await getPeriods(eeLayer, engine)
            setPeriods(periodsForLayer)
        }
        generatePeriods()
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
            setPeriod(null)
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

    const dataElementChanged = ({ selected }) => setCurrentDE(selected)
    const numberPrecisionChanged = ({ selected }) => console.log(selected)
    const layerChanged = async ({ selected }) => setEeLayer(selected)
    const periodChanged = ({ selected }) => setPeriod(selected)

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

                <div className={styles.row}>
                    <ImportButtonStrip />
                </div>
            </div>
        </Page>
    )
}

export { EarthEngineImport }
