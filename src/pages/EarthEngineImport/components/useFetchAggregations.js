import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm } from '@dhis2/ui'
import { useState, useEffect } from 'react'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'
import { getAggregations } from '../util/earthEngineHelper.js'
import getEarthEngineConfig from '../util/earthEngineLoader.js'
import { getPrecisionFn } from '../util/getPrecisionFn.js'
import { ALL_AGGREGATION_TYPES } from './AggregationType.js'
import { useCatOptComboSelections } from './useCatOptComboSelections.js'
import { usePeriods } from './usePeriods.js'

const { useFormState } = ReactFinalForm

const useFetchAggregations = () => {
    const { values } = useFormState()
    const {
        earthEngineId,
        organisationUnits,
        rounding,
        dataElement,
        period,
        aggregationType,
    } = values

    const { bandMap } = useCatOptComboSelections()
    const { periods } = usePeriods(earthEngineId)
    const { displayProperty } = useCachedDataQuery()
    const engine = useDataEngine()

    const [error, setError] = useState(undefined) // TODO unused properties
    const [loading, setLoading] = useState(false)
    const [eeData, setEeData] = useState(null)

    // const getValueWithPrecision = useCallback(() => {
    //     getPrecisionFn(rounding)
    // }, [rounding])

    const getValueWithPrecision = getPrecisionFn(rounding)

    useEffect(() => {
        const fetchEeAggregations = async () => {
            const eeOptions = {
                id: earthEngineId,
                rows: organisationUnits,
                filter: periods.filter((p) => period === p.name),
                aggregationType: [aggregationType],
            }

            if (bandMap) {
                eeOptions.band = Object.keys(bandMap)
            }

            const config = await getEarthEngineConfig(
                eeOptions,
                engine,
                displayProperty
            )

            const data = await getAggregations(engine, config)

            const structuredData = Object.entries(data).reduce(
                (acc, [ouId, valueSet]) => {
                    if (bandMap) {
                        Object.entries(valueSet).forEach(
                            ([bandId, rawValue]) => {
                                if (!ALL_AGGREGATION_TYPES.includes(bandId)) {
                                    const ouName = organisationUnits.find(
                                        (ou) => ou.id === ouId
                                    )?.name
                                    acc.push({
                                        ouId,
                                        ouName,
                                        bandId,
                                        value: getValueWithPrecision(rawValue),
                                    })
                                }
                            }
                        )
                    } else {
                        const ouName = organisationUnits.find(
                            (ou) => ou.id === ouId
                        )?.name
                        acc.push({
                            ouId,
                            ouName,
                            value: getValueWithPrecision(
                                valueSet[aggregationType]
                            ),
                        })
                    }

                    return acc
                },
                []
            )
            setEeData(structuredData)
        }
        if (
            earthEngineId &&
            period &&
            organisationUnits &&
            aggregationType &&
            rounding &&
            dataElement &&
            aggregationType
        ) {
            fetchEeAggregations()
        }
    }, [
        earthEngineId,
        period,
        organisationUnits,
        aggregationType,
        rounding,
        dataElement,
        displayProperty,
        engine,
        // bandMap,
        // periods,
        // getValueWithPrecision,
    ])

    const validationText =
        error &&
        i18n.t(
            'Something went wrong when fetching the EE aggregations: {{message}}',
            {
                message: error.message,
                nsSeparator: '^^',
            }
        )

    return { loading, error, validationText, eeData }
}

export { useFetchAggregations }
