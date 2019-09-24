import { createSelector } from 'reselect'

/**
 * Helpers
 * =======
 * =======
 * =======
 */

/**
 * Group and sort schemas
 * ======================
 */
const groupSchemas = schemas =>
    schemas.reduce((groups, schema) => {
        const { group } = schema

        return {
            ...groups,
            [group]: groups[group] ? [...groups[group], schema] : [schema],
        }
    }, {})

const combineSingleItemGroups = groups => {
    const groupNames = Object.keys(groups)

    return groupNames.reduce(
        (combinedGroups, groupName) => {
            const group = groups[groupName]

            if (group.length === 1) {
                return {
                    ...combinedGroups,
                    other: [...combinedGroups.other, group[0]],
                }
            }

            return {
                ...combinedGroups,
                [groupName]: group,
            }
        },
        { other: [] }
    )
}

/**
 * Get group label helpers
 * =======================
 */
function breakOnCamelCase(schemaName, name) {
    const temp = schemaName.substr(0, name.length).replace(/([A-Z]+)/g, ' $1')
    return temp[0].toUpperCase() + temp.substr(1)
}

function groupLabelLowerCase(name, schemas) {
    const validate = n => name === n.toLowerCase()
    for (let i = 0; i < schemas.length; i += 1) {
        if (validate(schemas[i]['name'])) {
            return [true, schemas[i]['displayName']]
        }
    }

    return [false, null]
}

function groupLabelCamelCase(name, schemas) {
    const validate = n => n.includes(name) && n.indexOf(name) === 0
    for (let i = 0; i < schemas.length; i += 1) {
        const schemaName = schemas[i]['name'].toLowerCase()
        if (validate(schemaName)) {
            return [true, breakOnCamelCase(schemas[i]['name'], name)]
        }
    }

    return [false, null]
}

function groupLabel(name, schemas) {
    const nameLC = name.toLowerCase()
    if (nameLC === 'oauth2' || nameLC === 'other') {
        return name
    }

    const [isLower, displayName] = groupLabelLowerCase(nameLC, schemas)
    if (isLower) {
        return displayName
    }

    const [isCamelCase, ccName] = groupLabelCamelCase(nameLC, schemas)
    if (isCamelCase) {
        return ccName
    }

    return name[0].toUpperCase() + name.substr(1)
}

/**
 * Selectors
 * =========
 * =========
 * =========
 */
export const getSchemas = state => state.schemas.list

export const getSchemaGroups = createSelector(
    getSchemas,
    schemas => {
        const groups = groupSchemas(schemas)
        const combinedGroups = combineSingleItemGroups(groups)

        return combinedGroups
    }
)

export const getGroupLables = createSelector(
    getSchemaGroups,
    schemaGroups => {
        return Object.entries(schemaGroups).reduce(
            (groupLabels, [groupKey, schemas]) => {
                const label = groupLabel(groupKey, schemas)

                return {
                    ...groupLabels,
                    [groupKey]: label,
                }
            },
            {}
        )
    }
)

export const getGroupOrder = createSelector(
    getSchemaGroups,
    schemas => {
        const groupKeys = Object.keys(schemas)
        groupKeys.sort()
        return groupKeys
    }
)
