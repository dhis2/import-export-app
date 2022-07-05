import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm } from '@dhis2/ui'
import { useState, useEffect } from 'react'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'
import { getAggregations } from '../util/earthEngineHelper.js'
import getEarthEngineConfig from '../util/earthEngineLoader.js'
import { ALL_AGGREGATION_TYPES } from './AggregationType.js'
import { getPrecisionFn } from './Rounding.js'
import { useCatOptComboSelections } from './useCatOptComboSelections.js'
import { usePeriods } from './usePeriods.js'

const { useField } = ReactFinalForm

const useFetchAggregations = () => {
    const { input: earthEngineIdInput } = useField('earthEngineId')
    const { value: eeId } = earthEngineIdInput
    const { input: orgUnitInput } = useField('organisationUnits')
    const { value: orgUnits } = orgUnitInput
    const { input: roundingInput } = useField('rounding')
    const { value: precision } = roundingInput
    const { input: dataElementInput } = useField('dataElement')
    const { value: dataElementId } = dataElementInput
    const { input: periodInput } = useField('period')
    const { value: period } = periodInput
    const { input: aggTypeInput } = useField('aggregationType')
    const { value: aggregationType } = aggTypeInput

    const { bandMap } = useCatOptComboSelections()

    const { periods } = usePeriods(eeId, Function.prototype)
    const { userSettings } = useCachedDataQuery()
    const engine = useDataEngine()

    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [eeData, setEeData] = useState(null)

    const getValueWithPrecision = getPrecisionFn(precision)

    useEffect(() => {
        const fetchEeAggregations = async () => {
            const eeOptions = {
                id: eeId,
                rows: orgUnits,
                filter: periods.filter((p) => period === p.name),
                aggregationType: [aggregationType],
            }

            console.log('eeOptions', eeOptions)

            if (bandMap) {
                eeOptions.band = Object.keys(bandMap)
            }

            const config = await getEarthEngineConfig(
                eeOptions,
                engine,
                userSettings.keyAnalysisDisplayProperty
            )

            const data = await getAggregations(engine, config)
            const structuredData = Object.entries(data).reduce(
                (acc, [ouId, valueSet]) => {
                    if (bandMap) {
                        Object.entries(valueSet).forEach(
                            ([bandId, rawValue]) => {
                                if (!ALL_AGGREGATION_TYPES.includes(bandId)) {
                                    const ouName = orgUnits.find(
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
                        const ouName = orgUnits.find(
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
            eeId &&
            period &&
            orgUnits &&
            aggregationType &&
            precision &&
            dataElementId &&
            aggregationType
        ) {
            fetchEeAggregations()
        }
    }, [eeId, period, orgUnits, aggregationType, precision, dataElementId])

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
