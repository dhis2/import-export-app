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

export const getUniqueAttributes = ({ type }) => {
    const params = [
        `paging=false`,
        `fields=${['id', 'displayName'].join(',')}`,
        `filter=unique:eq:true`,
        `filter=${type}Attribute:eq:true`,
    ]

    return api.get(`${ATTRIBUTES_ENDPOINT}?${params.join('&')}`)
}

export const getUniqueDataElementAttributes = () =>
    getUniqueAttributes({ type: 'dataElement' })
        .then(({ attributes }) => attributes)
        .catch(() => [])

export const getUniqueOrganisationUnitAttributes = () =>
    getUniqueAttributes({ type: 'organisationUnit' })
        .then(({ attributes }) => attributes)
        .catch(() => [])
