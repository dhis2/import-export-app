import { getInstance } from 'd2/lib/d2'

const ATTRIBUTES_ENDPOINT = 'attributes.json'

export const getD2 = () => getInstance()
export const getApi = async () => {
    const d2 = await getD2()
    return d2.Api.getApi()
}

export const getUniqueAttributes = async ({ type }) => {
    const params = [
        `paging=false`,
        `fields=${['id', 'displayName'].join(',')}`,
        `filter=unique:eq:true`,
        `filter=${type}Attribute:eq:true`,
    ]

    const api = await getApi()
    return api
        .get(`${ATTRIBUTES_ENDPOINT}?${params.join('&')}`)
        .then(({ attributes }) => attributes)
        .catch(() => [])
}

export const getUniqueDataElementAttributes = () =>
    getUniqueAttributes({ type: 'dataElement' })

export const getUniqueOrganisationUnitAttributes = () =>
    getUniqueAttributes({ type: 'organisationUnit' })

export const getUniqueCategoryAttributes = () =>
    getUniqueAttributes({ type: 'categoryOptionCombo' })

export const getSchemas = async () => {
    const api = await getApi()
    const fields = ['metadata', 'collectionName', 'displayName', 'klass']
    const params = [`fields=${fields.join(',')}`]

    return api.get(`schemas.json?${params.join('&')}`)
}

export const getDataSets = async () => {
    const d2 = await getD2()
    return d2.models.dataSet
        .list({ paging: false, fields: 'id,displayName' })
        .then(collection => collection.toArray())
        .catch(() => [])
}
