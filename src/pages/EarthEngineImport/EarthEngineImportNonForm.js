import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    // ReactFinalForm,
    // SingleSelectFieldFF,
    // composeValidators,
    // createEqualTo,
    // hasValue,
    SingleSelect,
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
import styles from './EarthEngineImport.module.css'
import { getEarthEngineLayers } from './earthEngines'

const alertValues = values => {
    const formattedValuesString = JSON.stringify(values, null, 2)
    alert(formattedValuesString)
}

const dataSetQuery = {
    datasets: {
        resource: 'dataSets',
        params: {
            fields: 'id,name,dataSetElements[dataElement[name,id]]',
            paging: 'false',
        },
    },
}
const EarthEngineImport = () => {
    const [currentDS, setCurrentDS] = useState(null)
    const [currentDE, setCurrentDE] = useState(null)
    const [dataSets, setDataSets] = useState([])
    const [dataSetElements, setDataSetElements] = useState([])
    const { loading, data, error } = useDataQuery(dataSetQuery)

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

    const eeLayers = getEarthEngineLayers()
        .filter(({ legacy }) => !legacy)
        .map(({ name }) => ({
            label: name,
            value: name,
        }))

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
                        selected="Population"
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

                {/* <div className={styles.row}>
                    <ReactFinalForm.Field
                        name="numberprecision"
                        label="Number precision"
                        component={SingleSelectFieldFF}
                        className={styles.numberprecision}
                        initialValue="none"
                        options={[
                            { label: 'Professor', value: 'prof' },
                            { label: 'Doctor', value: 'doc' },
                            { label: 'None', value: 'none' },
                        ]}
                    />
                    <ReactFinalForm.Field
                        name="decimals"
                        label="Decimals"
                        component={SingleSelectFieldFF}
                        className={styles.numberprecision}
                        initialValue="none"
                        options={[
                            { label: 'Professor', value: 'prof' },
                            { label: 'Doctor', value: 'doc' },
                            { label: 'None', value: 'none' },
                        ]}
                    />
                </div> */}

                <div className={styles.row}>
                    <ImportButtonStrip />
                </div>
            </div>
        </Page>
    )
}

export { EarthEngineImport }
