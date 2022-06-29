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
    aggregationType,
    precision,
}) => {
    const getValueWithPrecision = getPrecisionFn(precision)

    const dataValues = Object.entries(data).map(([orgUnit, valueSet]) => {
        return {
            dataElement,
            period,
            orgUnit,
            value: getValueWithPrecision(valueSet[aggregationType]),
        }
    })

    console.log('dataValues', dataValues)

    return apiFetch(`${baseUrl}/api/dataValueSets`, 'POST', {
        dataValues,
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log('error', error)
        })
        .then(setResponse)
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
    const {
        earthEngineId,
        organisationUnits,
        period,
        aggregationType,
        dataElements,
        rounding,
    } = values

    const eeOptions = {
        id: earthEngineId,
        rows: organisationUnits,
        filter: periods.filter(p => period === p.name),
        aggregationType: [aggregationType],
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

    postDataWithFetch({
        baseUrl,
        data,
        dataElement: dataElements,
        period,
        aggregationType,
        precision: rounding,
    })
}

export { onImport }
