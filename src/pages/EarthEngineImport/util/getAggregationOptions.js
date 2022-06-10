import i18n from '@dhis2/d2-i18n'
import { getEarthEngineConfigs } from './earthEngines'

const AGGREGATION_TYPE_MIN = 'min'
const AGGREGATION_TYPE_MAX = 'max'
const AGGREGATION_TYPE_MEAN = 'mean'
const AGGREGATION_TYPE_MEDIAN = 'median'
const AGGREGATION_TYPE_SUM = 'sum'
const AGGREGATION_TYPE_STDDEV = 'stdDev'
const AGGREGATION_TYPE_VARIANCE = 'variance'

const ALL_AGGREGATION_TYPES = [
    AGGREGATION_TYPE_MIN,
    AGGREGATION_TYPE_MAX,
    AGGREGATION_TYPE_MEAN,
    AGGREGATION_TYPE_MEDIAN,
    AGGREGATION_TYPE_SUM,
    AGGREGATION_TYPE_STDDEV,
    AGGREGATION_TYPE_VARIANCE,
]

export const getAggregationOptions = id => {
    const aggregationTypesForEeId =
        getEarthEngineConfigs(id)?.aggregations || ALL_AGGREGATION_TYPES

    const types = [
        { id: AGGREGATION_TYPE_MIN, name: i18n.t('Min') },
        { id: AGGREGATION_TYPE_MAX, name: i18n.t('Max') },
        { id: AGGREGATION_TYPE_MEAN, name: i18n.t('Mean') },
        { id: AGGREGATION_TYPE_MEDIAN, name: i18n.t('Median') },
        { id: AGGREGATION_TYPE_SUM, name: i18n.t('Sum') },
        {
            id: AGGREGATION_TYPE_STDDEV,
            name: i18n.t('Std dev'),
        },
        { id: AGGREGATION_TYPE_VARIANCE, name: i18n.t('Variance') },
    ]

    return types.filter(type => aggregationTypesForEeId.includes(type.id))
}

export const getDefaultAggregation = id => {
    const defaultAggregations = getEarthEngineConfigs(id).defaultAggregations
    return Array.isArray(defaultAggregations)
        ? defaultAggregations[0]
        : defaultAggregations
}
