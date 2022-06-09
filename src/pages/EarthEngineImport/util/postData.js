import { apiFetch } from '../api/apiFetch.js'
import { getPrecisionFn } from './getPrecisionFn.js'

export const postDataWithFetch = ({
    baseUrl,
    data,
    dataElement,
    period,
    valueType,
    precision,
}) => {
    const getValueWithPrecision = getPrecisionFn(precision)

    const dataValuesArray = Object.entries(data).map(d => {
        const orgUnit = d[0]
        const value = getValueWithPrecision(d[1][valueType])

        return {
            dataElement,
            period,
            orgUnit,
            value,
        }
    })

    const dataValues = {
        dataValues: dataValuesArray,
    }

    console.log('dataValuesArray', dataValuesArray)

    return apiFetch(
        `${baseUrl}/api/dataValueSets`,
        'POST',
        dataValues
    ).then(response => response.json())
    // .then(setResponse)
}
