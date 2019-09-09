import {
    getUniqueDataElementAttributes,
    getUniqueOrganisationUnitAttributes,
    getUniqueCategoryAttributes,
} from '../../helpers/api'
import {
    loadingAttributesError,
    loadingAttributesStart,
    setAttribute,
} from './actions'

export const fetchUniqueDataElementAttributes = () => dispatch => {
    dispatch(loadingAttributesStart('dataElement'))

    return getUniqueDataElementAttributes()
        .then(attributes => dispatch(setAttribute('dataElement', attributes)))
        .catch(error =>
            dispatch(loadingAttributesError('dataElement', error.message))
        )
}

export const fetchUniqueOrgUnitAttributes = () => dispatch => {
    dispatch(loadingAttributesStart('organisationUnit'))

    return getUniqueOrganisationUnitAttributes()
        .then(attributes =>
            dispatch(setAttribute('organisationUnit', attributes))
        )
        .catch(error =>
            dispatch(loadingAttributesError('organisationUnit', error.message))
        )
}

export const fetchUniqueCategoryAttributes = () => dispatch => {
    dispatch(loadingAttributesStart('category'))

    return getUniqueCategoryAttributes()
        .then(attributes => dispatch(setAttribute('category', attributes)))
        .catch(error =>
            dispatch(loadingAttributesError('category', error.message))
        )
}
