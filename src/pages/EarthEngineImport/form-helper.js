import { apiFetch } from './api/apiFetch'
import { getPrecisionFn } from './components/Rounding'
// import { postDataWithFetch } from './util/postData'
import { getAggregations } from './util/earthEngineHelper'
import getEarthEngineConfig from './util/earthEngineLoader'
import { POPULATION_AGE_GROUPS_DATASET_ID } from './util/earthEngines'

const postDataWithFetch = ({
    baseUrl,
    data,
    dataElement,
    period,
    valueType,
    precision,
}) => {
    const getValueWithPrecision = getPrecisionFn(precision)

    const dataValues = Object.entries(data).map(([orgUnit, valueSet]) => {
        return {
            dataElement,
            period,
            orgUnit,
            value: getValueWithPrecision(valueSet[valueType]),
        }
    })

    return apiFetch(`${baseUrl}/api/dataValueSets`, 'POST', {
        dataValues,
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log('error', error)
        })
    // .then(setResponse)
}

const onImport = ({
    engine,
    baseUrl,
    userSettings,
    periods,
    // setProgress,
    // addTask,
    // setShowFullSummaryTask,
}) => async values => {
    console.log('onImport')
    const {
        earthEngineId,
        organisationUnits,
        period,
        aggregation,
        dataElements,
        rounding,
    } = values

    console.log('values', values)

    const eeOptions = {
        id: earthEngineId,
        rows: organisationUnits,
        filter: periods.filter(p => period === p.name),
        aggregationType: [aggregation],
    }

    if (earthEngineId === POPULATION_AGE_GROUPS_DATASET_ID) {
        eeOptions.band = ['M_0', 'F_0']
    }
    const config = await getEarthEngineConfig(
        eeOptions,
        engine,
        userSettings.keyAnalysisDisplayProperty
    )

    const data = await getAggregations(engine, config)
    console.log('data', data)
    // setEeData(JSON.stringify(data))

    // postDataWithFetch({
    //     baseUrl,
    //     data,
    //     dataElement: dataElements,
    //     period,
    //     valueType: aggregation,
    //     precision: rounding,
    // })
}

export { onImport }
