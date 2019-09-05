import {
    getUniqueDataElementAttributes,
    getUniqueOrganisationUnitAttributes,
} from '../../helpers/api'
import {
    loadingAttributesError,
    loadingAttributesStart,
    setAttribute,
} from './actions'

export const fetchUniqueDataElementAttributes = () => dispatch => {
    dispatch(loadingAttributesStart())

    getUniqueDataElementAttributes()
        .then(attributes => {
            dispatch(setAttribute('dataElement', attributes))
        })
        .catch(error => {
            dispatch(loadingAttributesError(error.message))
        })
}

export const fetchUniqueOrgUnitAttributes = () => dispatch => {
    dispatch(loadingAttributesStart)

    getUniqueOrganisationUnitAttributes()
        .then(attributes => {
            dispatch(setAttribute('organisationUnit', attributes))
        })
        .catch(error => {
            dispatch(loadingAttributesError(error.message))
        })
}
