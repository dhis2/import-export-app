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

export const getOrgUnitRoot = async () => {
    const d2 = await getD2()
    return d2.models.organisationUnits.list({
        level: 1,
        paging: false,
        fields: 'id,path,displayName,children::isNotEmpty',
    })
}

export const getOrgUnitsForPath = async path => {
    const api = await getApi()
    const id = path.substr(path.lastIndexOf('/') + 1)
    const params = []
    params.push(`filter=id:in:[${id}]`)
    params.push(
        'fields=:all,displayName,path,children[id,displayName,path,children::isNotEmpty]'
    )
    params.push('paging=false')
    params.push('format=json')

    const data = await api.get(`organisationUnits?${params.join('&')}`)
    const { organisationUnits } = data

    if (!organisationUnits || !organisationUnits.length) return []
    if (!organisationUnits[0].children) return []
    return organisationUnits[0].children
}

export const getDataSets = async () => {
    const d2 = await getD2()
    return d2.models.dataSet
        .list({ paging: false, fields: 'id,displayName' })
        .then(collection => collection.toArray())
        .catch(() => [])
}

export const getPrograms = async () => {
    const api = await getApi()
    const params = 'fields=id,displayName&paging=false'
    return api.get(`programs?${params}`).then(({ programs }) => programs)
}

export const getProgramStages = async programId => {
    const api = await getApi()
    const endpoint = `programs/${programId}.json`
    const params = 'fields=id,displayName,programStages[id,displayName]'
    return api
        .get(`${endpoint}?${params}`)
        .then(({ data }) => data.programStages)
}
