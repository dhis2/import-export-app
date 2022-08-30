import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, SingleSelectFieldFF, hasValue } from '@dhis2/ui'
import React from 'react'
import { StyledField } from '../../../components/index.js'
import { getEarthEngineConfigs } from '../util/earthEngines.js'
import {
    AGGREGATION_TYPE,
    EARTH_ENGINE_ID,
} from '../util/formFieldConstants.js'

const AGGREGATION_TYPE_SUM = 'sum'
const AGGREGATION_TYPE_MIN = 'min'
const AGGREGATION_TYPE_MAX = 'max'
const AGGREGATION_TYPE_MEAN = 'mean'
const AGGREGATION_TYPE_MEDIAN = 'median'
const AGGREGATION_TYPE_STDDEV = 'stdDev'
const AGGREGATION_TYPE_VARIANCE = 'variance'

export const ALL_AGGREGATION_TYPES = [
    AGGREGATION_TYPE_SUM,
    AGGREGATION_TYPE_MIN,
    AGGREGATION_TYPE_MAX,
    AGGREGATION_TYPE_MEAN,
    AGGREGATION_TYPE_MEDIAN,
    AGGREGATION_TYPE_STDDEV,
    AGGREGATION_TYPE_VARIANCE,
]

const getAggregationOptions = (id) => {
    const aggregationTypesForEeId =
        getEarthEngineConfigs(id)?.aggregations || ALL_AGGREGATION_TYPES

    const types = [
        { value: AGGREGATION_TYPE_SUM, label: i18n.t('Sum') },
        { value: AGGREGATION_TYPE_MIN, label: i18n.t('Min') },
        { value: AGGREGATION_TYPE_MAX, label: i18n.t('Max') },
        { value: AGGREGATION_TYPE_MEAN, label: i18n.t('Mean') },
        { value: AGGREGATION_TYPE_MEDIAN, label: i18n.t('Median') },
        {
            value: AGGREGATION_TYPE_STDDEV,
            label: i18n.t('Std dev'),
        },
        { value: AGGREGATION_TYPE_VARIANCE, label: i18n.t('Variance') },
    ]

    return types.filter((type) => aggregationTypesForEeId.includes(type.value))
}

export const getDefaultAggregation = (eeId) => {
    const defaultAggregations = getEarthEngineConfigs(eeId).defaultAggregations

    //TODO if 'sum' is in the default aggregations, use that, otherwise el[0]
    return Array.isArray(defaultAggregations)
        ? defaultAggregations[0]
        : defaultAggregations
}

const { useField } = ReactFinalForm

const AggregationType = () => {
    const { input } = useField(EARTH_ENGINE_ID)
    const { value: earthEngineId } = input

    return (
        <div style={{ maxWidth: '200px' }}>
            <StyledField
                component={SingleSelectFieldFF}
                name={AGGREGATION_TYPE}
                label={i18n.t('Aggregation type')}
                options={getAggregationOptions(earthEngineId)}
                dataTest="input-aggregation-type"
                helpText={i18n.t(
                    'How the values will be aggregated for output and analysis.'
                )}
                filled
                validate={hasValue}
            />
        </div>
    )
}

export { AggregationType }
