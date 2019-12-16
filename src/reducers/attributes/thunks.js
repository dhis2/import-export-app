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
    dispatch(loadingAttributesStart('dataElement'))

    getUniqueDataElementAttributes()
        .then(attributes => {
            dispatch(setAttribute('dataElement', attributes))
        })
        .catch(error => {
            dispatch(loadingAttributesError('dataElement', error.message))
        })
}

export const fetchUniqueOrgUnitAttributes = () => dispatch => {
    dispatch(loadingAttributesStart('organisationUnit'))

    getUniqueOrganisationUnitAttributes()
        .then(attributes => {
            dispatch(setAttribute('organisationUnit', attributes))
        })
        .catch(error => {
            dispatch(loadingAttributesError('organisationUnit', error.message))
        })
}
