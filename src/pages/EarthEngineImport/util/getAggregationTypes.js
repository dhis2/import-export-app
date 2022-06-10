import i18n from '@dhis2/d2-i18n'
import { getEarthEngineLayer } from './earthEngines'
//TODO This function should be centralized somewhere - maybe analytics?

const getAggregationTypes = filter => {
    const types = ['min', 'max', 'mean', 'median', 'sum', 'stdDev', 'variance']

    return filter ? types.filter(type => filter.includes(type)) : types
}

export const getAggregationTypesForLayer = id => {
    const types = [
        { value: 'min', label: i18n.t('Min') },
        { value: 'max', label: i18n.t('Max') },
        { value: 'mean', label: i18n.t('Mean') },
        { value: 'median', label: i18n.t('Median') },
        { value: 'sum', label: i18n.t('Sum') },
        {
            value: 'stdDev',
            // label: i18n.t('Standard deviation'),
            label: i18n.t('Std dev'),
        },
        { value: 'variance', label: i18n.t('Variance') },
    ]
    const aggs = getEarthEngineLayer(id).aggregations || getAggregationTypes()

    return types.filter(type => aggs.includes(type.value))
}
