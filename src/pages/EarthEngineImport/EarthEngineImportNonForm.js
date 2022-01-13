// import { useDataQuery, useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
// import { loadEarthEngineWorker } from '@dhis2/maps-gl'
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
// import { getAuthToken } from './earthEngineHelper'
// import { getEarthEngineLayers } from './earthEngines'
// import NumberPrecisionSelect from './NumberPrecisionSelect'
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

const EarthEngineImport = () => <div>Hey there</div>

export default EarthEngineImport
// const EarthEngineImport = () => {
//     const [eeWorker, setEEWorker] = useState(null)
//     const [currentDS, setCurrentDS] = useState(null)
//     const [currentDE, setCurrentDE] = useState(null)
//     const [dataSets, setDataSets] = useState([])
//     const [dataSetElements, setDataSetElements] = useState([])
//     const engine = useDataEngine()
//     const { loading, data, error } = useDataQuery(dataSetQuery)

//     useEffect(() => {
//         const getWorkerInstance = async () => {
//             workerPromise =
//                 workerPromise ||
//                 (async () => {
//                     const EarthEngineWorker = await loadEarthEngineWorker(
//                         getAuthToken(engine)
//                     )
//                     return await new EarthEngineWorker()
//                 })()

//             return workerPromise
//         }

//         getWorkerInstance().then(worker => setEEWorker(worker))
//     }, [])

//     useEffect(() => {
//         if (data?.datasets) {
//             setDataSets(
//                 data.datasets.dataSets.map(({ id, name, dataSetElements }) => ({
//                     label: name,
//                     value: id,
//                     dataSetElements,
//                 }))
//             )
//         }
//     }, [data])

//     const eeLayers = getEarthEngineLayers()
//         .filter(({ legacy }) => !legacy)
//         .map(({ name }) => ({
//             label: name,
//             value: name,
//         }))

//     const dataSetChanged = ({ selected }) => {
//         const selectedDataSet = dataSets.find(s => s.value == selected)
//         const dsElements = selectedDataSet.dataSetElements.map(
//             ({ dataElement }) => ({
//                 label: dataElement.name,
//                 value: dataElement.id,
//             })
//         )
//         setCurrentDS(selected)
//         setDataSetElements(dsElements)
//     }

//     const dataElementChanged = ({ selected }) => setCurrentDE(selected)
//     const numberPrecisionChanged = val =>
//         console.log('numberPrecision changed to', val)

//     return (
//         <Page
//             title={i18n.t('Earth Engine Import')}
//             desc={i18n.t('Import Earth Engine data')}
//             // icon={PAGE_ICON}
//             // loading={progress}
//             dataTest="page-import-earthengine"
//             // summaryTask={getNewestTask(dataTasks)}
//             // showFullSummaryTask={showFullSummaryTask}
//         >
//             <div>
//                 <div className={styles.row}>
//                     <SingleSelect
//                         name="eelayer"
//                         label="Earth Engine"
//                         className={styles.eelayer}
//                         selected="Population"
//                     >
//                         {eeLayers.map(({ label, value }) => (
//                             <SingleSelectOption
//                                 key={value}
//                                 value={value}
//                                 label={label}
//                             />
//                         ))}
//                     </SingleSelect>
//                 </div>

//                 <div className={styles.row}>
//                     <SingleSelect
//                         name="dataset"
//                         label="Data Set"
//                         className={styles.dataset}
//                         onChange={dataSetChanged}
//                         selected={currentDS}
//                     >
//                         {dataSets.map(({ label, value }) => (
//                             <SingleSelectOption
//                                 key={value}
//                                 value={value}
//                                 label={label}
//                             />
//                         ))}
//                     </SingleSelect>
//                 </div>

//                 <div className={styles.row}>
//                     <SingleSelect
//                         name="dataelement"
//                         label="Data Element"
//                         className={styles.dataelement}
//                         selected={currentDE}
//                         onChange={dataElementChanged}
//                     >
//                         {dataSetElements.map(({ label, value }) => (
//                             <SingleSelectOption
//                                 key={value}
//                                 value={value}
//                                 label={label}
//                             />
//                         ))}
//                     </SingleSelect>
//                 </div>

//                 <div className={styles.row}>
//                     <NumberPrecisionSelect
//                         onChange={numberPrecisionChanged}
//                         precision="1"
//                     />
//                 </div>

//                 <div className={styles.row}>
//                     <ImportButtonStrip />
//                 </div>
//             </div>
//         </Page>
//     )
// }

export { EarthEngineImport }
