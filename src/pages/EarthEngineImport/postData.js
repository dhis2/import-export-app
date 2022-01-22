import { apiFetch } from './apiFetch'

export const query = {
    resource: 'dataValueSets',
    type: 'create',
    data: ({ data }) => data,
}

export const postDataWithEngine = async (dataEngine, data) => {
    console.log('postDataValueSet', data)
    const dataValues = data.map(d => ({
        dataElement: dataElement.id,
        period: period,
        orgUnit: d.id,
        value: valueFormat(d.properties[propName]),
    }))
    const { response } = await dataEngine.mutate(createDashboardMutation, {
        variables: {
            data: generatePayload({}, data),
        },
    })

    return response.uid
}

// Rounds a number to d decimals
const numberPrecision = d => {
    const m = Math.pow(10, d)
    return n => Math.round(n * m) / m
}

export const postDataWithFetch = ({
    data,
    // dataSet,
    dataElement,
    period,
    valueType,
    baseUrl,
    // precision,
    // name,
}) => {
    const precision = 1

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

    // console.log('dataValuesArray', dataValuesArray)

    return apiFetch(
        `${baseUrl}/api/dataValueSets`,
        'POST',
        dataValues
    ).then(response => response.json())
    // .then(setResponse)
}
