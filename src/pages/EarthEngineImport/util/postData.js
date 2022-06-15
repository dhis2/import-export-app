import { apiFetch } from '../api/apiFetch.js'
import { getPrecisionFn } from '../components/Rounding'

export const postDataWithFetch = ({
    baseUrl,
    data,
    dataElement,
    period,
    valueType,
    precision,
}) => {
    const getValueWithPrecision = getPrecisionFn(precision)

    const dataValues = Object.entries(data).map(([orgUnit, valueSet]) => {
        return {
            dataElement,
            period,
            orgUnit,
            value: getValueWithPrecision(valueSet[valueType]),
        }
    })

    return apiFetch(`${baseUrl}/api/dataValueSets`, 'POST', {
        dataValues,
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log('error', error)
        })
    // .then(setResponse)
}
