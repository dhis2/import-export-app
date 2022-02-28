import { apiFetch } from './apiFetch'
import { numberPrecision } from './util'

export const postDataWithFetch = ({
    baseUrl,
    data,
    dataElement,
    period,
    valueType,
    precision,
}) => {
    const roundFn = numberPrecision(precision)

    const dataValuesArray = Object.entries(data).map(d => {
        const orgUnit = d[0]
        const value = roundFn(d[1][valueType])

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
