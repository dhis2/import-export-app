import { getInstance } from 'd2/lib/d2'

const ATTRIBUTES_ENDPOINT = 'attributes.json'

export const getApi = async () => {
    const d2 = await getInstance()
    return d2.Api.getApi()
}

export const getUniqueAttributes = async ({ type }) => {
    const api = await getApi()
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

export const getUniqueCategoryAttributes = () =>
    getUniqueAttributes({ type: 'categoryOptionCombo' })
        .then(({ attributes }) => attributes)
        .catch(() => [])

export const getSchemas = async () => {
    const api = await getApi()
    return api.get('schemas.json')
}
