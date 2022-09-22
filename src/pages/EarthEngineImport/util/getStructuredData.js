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

export const OU_ID = 'ouId'
export const OU_NAME = 'ouName'
export const BAND_ID = 'id'
export const COC_ID = 'coc'
export const VALUE = 'value'

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
                [OU_ID]: ouId,
                [OU_NAME]: ouName,
                [BAND_ID]: selectedBandCocs[0].id,
                [VALUE]: getValueWithPrecision(valueSet[aggregationType]),
            })
        } else if (selectedBandCocs.length > 1) {
            Object.entries(valueSet).forEach(([groupId, rawValue]) => {
                if (!isAggregation(groupId)) {
                    acc.push({
                        [OU_ID]: ouId,
                        [OU_NAME]: ouName,
                        [BAND_ID]: groupId,
                        [VALUE]: getValueWithPrecision(rawValue),
                    })
                }
            })
        } else {
            acc.push({
                [OU_ID]: ouId,
                [OU_NAME]: ouName,
                [VALUE]: getValueWithPrecision(valueSet[aggregationType]),
            })
        }

        return acc
    }, [])
}

export { getStructuredData }
