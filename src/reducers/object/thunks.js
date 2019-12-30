import { getObjects } from '../../helpers/api'
import { loadingObjectsError, loadingObjectsStart, setObjects } from './actions'

/**
 * @param {string} objectType
 * @returns {Function}
 */
export const fetchObjects = objectType => dispatch => {
    dispatch(loadingObjectsStart())

    return getObjects(objectType)
        .then(objects => {
            const formattedObjects = objects.map(object => ({
                value: object.id,
                label: object.displayName,
            }))

            return dispatch(setObjects(formattedObjects))
        })
        .catch(({ message }) => dispatch(loadingObjectsError(message)))
}
