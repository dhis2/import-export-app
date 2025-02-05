export const nameToDataTest = (name) => {
    switch (name) {
        case 'assignedUserModeFilter':
            return 'assignedUserModeFilter'

        case 'assignedUser':
            return 'input-user-picker-list'

        case 'async':
            return 'isAsync'

        case 'children':
            return 'includeChildren'

        case 'dataElementIdScheme':
            return 'input-data-element-id-scheme'

        case 'orgUnitIdScheme':
            return 'input-org-unit-id-scheme'

        case 'idScheme':
            return 'input-id-scheme'

        case 'program':
            return 'input-program-picker'

        case 'programStages':
            return 'input-program-stage-select'

        case 'objectType':
            return 'input-object-type'

        case 'objectList':
            return 'input-object-select'

        case 'trackedEntityType':
            return 'input-te-type-picker'

        default:
            return name
    }
}
