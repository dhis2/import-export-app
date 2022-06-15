import qs from 'query-string'

const getComparisonData = (url) => {
    return cy
        .getAliases('@defaultData', '@changedData')
        .then(([defaultData, changedData]) => {
            const params = url.split('?')[1]
            const actual = qs.parse(params)
            const expected = { ...defaultData, ...changedData }

            return { actual, expected }
        })
}

Cypress.Commands.add('getComparisonData', getComparisonData)
