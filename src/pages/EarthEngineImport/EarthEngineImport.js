import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    ReactFinalForm,
    SingleSelectFieldFF,
    // composeValidators,
    // createEqualTo,
    // hasValue,
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
    const [dataSets, setDataSets] = useState([])
    const [dataSetElements, setDataSetElements] = useState([])
    const { loading, data, error } = useDataQuery(dataSetQuery)

    useEffect(() => {
        if (data?.datasets) {
            console.log('data.datasets', data.datasets.dataSets)
            setDataSets(
                data.datasets.dataSets.map(({ id, name }) => ({
                    label: name,
                    value: id,
                }))
            )
        } else {
            console.log('no data yet')
        }
    }, [data])

    const eeLayers = getEarthEngineLayers()
        .filter(({ legacy }) => !legacy)
        .map(({ name }) => ({
            label: name,
            value: name,
        }))

    const dataSetChanged = e => {
        console.log('dataSetChanged', e)
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
            <ReactFinalForm.Form onSubmit={alertValues}>
                {({ handleSubmit, form }) => (
                    <form onSubmit={handleSubmit}>
                        <div className={styles.row}>
                            <ReactFinalForm.Field
                                name="eelayer"
                                label="Earth Engine"
                                component={SingleSelectFieldFF}
                                className={styles.eelayer}
                                initialValue="Population"
                                options={eeLayers}
                            />
                        </div>

                        <div className={styles.row}>
                            <ReactFinalForm.Field
                                name="dataset"
                                label="Data Set"
                                component={SingleSelectFieldFF}
                                className={styles.dataset}
                                // initialValue="none"
                                options={dataSets}
                                onBlur={dataSetChanged}
                            />
                        </div>

                        <div className={styles.row}>
                            <ReactFinalForm.Field
                                name="dataelement"
                                label="Data Element"
                                component={SingleSelectFieldFF}
                                className={styles.dataelement}
                                // initialValue="none"
                                options={dataSetElements}
                            />
                        </div>

                        <div className={styles.row}>
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
                        </div>

                        <div className={styles.row}>
                            <ImportButtonStrip form={form} />
                        </div>
                    </form>
                )}
            </ReactFinalForm.Form>
        </Page>
    )
}

export { EarthEngineImport }
