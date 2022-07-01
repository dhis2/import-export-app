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
    cocMap,
}) => {
    const getValueWithPrecision = getPrecisionFn(precision)

    let dataValues

    console.log('post, cocMap', cocMap)

    if (cocMap) {
        dataValues = Object.entries(data).reduce((acc, curr) => {
            const [orgUnit, valueSet] = curr
            Object.entries(valueSet).forEach(([bandId, rawValue]) => {
                const ds = {
                    dataElement,
                    period,
                    orgUnit,
                    categoryOptionCombo: cocMap[bandId],
                    value: getValueWithPrecision(rawValue),
                }

                acc.push(ds)
            })

            return acc
        }, [])
    } else {
        dataValues = Object.entries(data).map(([orgUnit, valueSet]) => {
            return {
                dataElement,
                period,
                orgUnit,
                value: getValueWithPrecision(valueSet[aggregationType]),
            }
        })
    }

    console.log('dataValues', dataValues)

    return apiFetch(`${baseUrl}/api/dataValueSets`, 'POST', {
        dataValues,
    })
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            console.log('error', error)
        })
    // .then(setResponse)
}

const onImport =
    ({
        engine,
        baseUrl,
        userSettings,
        periods,
        // setProgress,
        // addTask,
        // setShowFullSummaryTask,
    }) =>
    async (values) => {
        const {
            earthEngineId,
            organisationUnits,
            period,
            aggregationType,
            dataElement,
            rounding,
        } = values

        const eeOptions = {
            id: earthEngineId,
            rows: organisationUnits,
            filter: periods.filter((p) => period === p.name),
            aggregationType: [aggregationType],
        }

        let cocMap

        if (earthEngineId === POPULATION_AGE_GROUPS_DATASET_ID) {
            // TODO get this from earthEngineConfigs
            eeOptions.band = ['M_0', 'F_0', 'M_1', 'F_1', 'M_5', 'F_5']
            const {
                M_0: cocId_M0,
                M_1: cocId_M1,
                M_5: cocId_M5,
                F_0: cocId_F0,
                F_1: cocId_F1,
                F_5: cocId_F5,
            } = values

            cocMap = {
                M_0: cocId_M0,
                M_1: cocId_M1,
                M_5: cocId_M5,
                F_0: cocId_F0,
                F_1: cocId_F1,
                F_5: cocId_F5,
            }
        }
        const config = await getEarthEngineConfig(
            eeOptions,
            engine,
            userSettings.keyAnalysisDisplayProperty
        )

        const data = await getAggregations(engine, config)
        console.log('and now the data', config, data)

        postDataWithFetch({
            baseUrl,
            data,
            dataElement,
            period,
            aggregationType,
            precision: rounding,
            cocMap,
        })
    }

export { onImport }
