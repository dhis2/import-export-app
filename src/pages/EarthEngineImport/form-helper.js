import { apiFetch } from './api/apiFetch.js'
import { getPrecisionFn } from './components/Rounding.js'
import { getAggregations } from './util/earthEngineHelper.js'
import getEarthEngineConfig from './util/earthEngineLoader.js'
import { getEarthEngineConfigs } from './util/earthEngines.js'
import { EEPeriods } from './util/EEPeriods.js'
import { getCocMap } from './util/getCocMap.js'

const onImport =
    ({
        engine,
        baseUrl,
        userSettings,
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
            ...rest
        } = values

        const allBands = getEarthEngineConfigs(earthEngineId).bands
        const bands = allBands ? allBands.map((b) => b.id) : null

        //TODO replace EEPeriods with periods provided by the usePeriods hook
        const eeOptions = {
            id: earthEngineId,
            rows: organisationUnits,
            filter: EEPeriods.filter((p) => period === p.name),
            aggregationType: [aggregationType],
            band: bands,
        }

        const config = await getEarthEngineConfig(
            eeOptions,
            engine,
            userSettings.keyAnalysisDisplayProperty
        )

        const data = await getAggregations(engine, config)
        const cocMap = getCocMap(earthEngineId, rest)

        const getValueWithPrecision = getPrecisionFn(rounding)

        let dataValues

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

        // return apiFetch(`${baseUrl}/api/dataValueSets`, 'POST', {
        //     dataValues,
        // })
        //     .then((response) => {
        //         return response.json()
        //     })
        //     .catch((error) => {
        //         console.log('error', error)
        //     })
        // .then(setResponse)
    }

export { onImport }
