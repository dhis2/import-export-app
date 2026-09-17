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

        case 'categoryIdScheme':
            return 'input-category-id-scheme'

        case 'categoryOptionIdScheme':
            return 'input-category-option-id-scheme'

        case 'categoryOptionComboIdScheme':
            return 'input-category-option-combo-id-scheme'

        case 'dataSetIdScheme':
            return 'input-data-set-id-scheme'

        case 'attributeOptionComboIdScheme':
            return 'input-attribute-option-combo-id-scheme'

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
