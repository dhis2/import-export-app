import { createSelector } from 'reselect'

// Groups schemas into groups
// Ie. All Data Element related into 'dataElement'
function schemaGroups(schemas) {
    const groups = {}

    schemas.forEach(s => {
        if (!groups[s.group]) {
            groups[s.group] = []
        }

        groups[s.group].push(s)
    })

    // check groups with 1 item and merge inside Other
    const groupsWith1Item = []
    const OTHER_GROUP_NAME = 'other'
    let otherGroup = []

    Object.entries(groups).forEach(([k, v]) => {
        if (v.length === 1) {
            groupsWith1Item.push(k)
            v[0]['group'] = OTHER_GROUP_NAME
            otherGroup = otherGroup.concat(v)
        }
    })
    groups[OTHER_GROUP_NAME] = otherGroup

    groupsWith1Item.forEach(k => {
        delete groups[k]
    })

    return groups
}

export const getSchemas = state => {
    console.log('state', state)
    return state.schemas.list
}

export const getSortedSchemaGroups = createSelector(
    getSchemas,
    schemas => {
        console.log('schemas', schemas)
        return schemaGroups(schemas)
    }
)
