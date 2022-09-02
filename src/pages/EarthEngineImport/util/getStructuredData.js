import { getPrecisionFn } from './getPrecisionFn.js'

const AGGREGATION_TYPE_SUM = 'sum'
const AGGREGATION_TYPE_MIN = 'min'
const AGGREGATION_TYPE_MAX = 'max'
const AGGREGATION_TYPE_MEAN = 'mean'
const AGGREGATION_TYPE_MEDIAN = 'median'
const AGGREGATION_TYPE_STDDEV = 'stdDev'
const AGGREGATION_TYPE_VARIANCE = 'variance'

const ALL_AGGREGATION_TYPES = [
    AGGREGATION_TYPE_SUM,
    AGGREGATION_TYPE_MIN,
    AGGREGATION_TYPE_MAX,
    AGGREGATION_TYPE_MEAN,
    AGGREGATION_TYPE_MEDIAN,
    AGGREGATION_TYPE_STDDEV,
    AGGREGATION_TYPE_VARIANCE,
]

const isAggregation = (bandId) => ALL_AGGREGATION_TYPES.includes(bandId)

const getStructuredData = ({
    data,
    selectedBandCocs,
    ouIdNameMap,
    rounding,
    aggregationType,
}) => {
    const getValueWithPrecision = getPrecisionFn(rounding)
    return Object.entries(data).reduce((acc, [ouId, valueSet]) => {
        const ouName = ouIdNameMap[ouId].parentName
            ? `${ouIdNameMap[ouId].parentName}/${ouIdNameMap[ouId].name}`
            : ouIdNameMap[ouId].name

        if (selectedBandCocs.length === 1) {
            acc.push({
                ouId,
                ouName,
                bandId: selectedBandCocs[0].bandId,
                value: getValueWithPrecision(valueSet[aggregationType]),
            })
        } else if (selectedBandCocs.length > 1) {
            Object.entries(valueSet).forEach(([groupId, rawValue]) => {
                if (!isAggregation(groupId)) {
                    acc.push({
                        ouId,
                        ouName,
                        bandId: groupId,
                        value: getValueWithPrecision(rawValue),
                    })
                }
            })
        } else {
            acc.push({
                ouId,
                ouName,
                value: getValueWithPrecision(valueSet[aggregationType]),
            })
        }

        return acc
    }, [])
}

export { getStructuredData }
