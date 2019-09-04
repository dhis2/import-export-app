const ATTRIBUTES_ENDPOINT = 'attributes.json'

let d2
let api

/**
 * Sets d2 and the api
 */
export const initApi = d2Instance => {
    d2 = d2Instance
    api = d2.Api.getApi()
}

export const getAttributes = ({
    filter = [],
    paging = false,
    unique = true,
}) => {
    const params = [
        `paging=${paging}`,
        `fields=${['id', 'displayName'].join(',')}`,
        ...[...filter, `unique:eq:${unique}`].map(f => `filter=${f}`),
    ]

    return api.get(`${ATTRIBUTES_ENDPOINT}?${params.join('&')}`)
}

export const getUniqueDataElementAttributes = () =>
    getAttributes({ filter: ['dataElementAttribute:eq:true'] })
        .then(({ attributes }) => attributes)
        .catch(() => [])

export const getUniqueOrganisationUnitAttributes = () =>
    getAttributes({ filter: ['organisationUnitAttribute:eq:true'] })
        .then(({ attributes }) => attributes)
        .catch(() => [])
