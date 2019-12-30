export const LOADING_OBJECTS_START = 'LOADING_OBJECTS_START'
export const LOADING_OBJECTS_ERROR = 'LOADING_OBJECTS_ERROR'
export const SET_OBJECTS = 'SET_OBJECTS'

/**
 * @returns {Object}
 */
export const loadingObjectsStart = () => ({
    type: LOADING_OBJECTS_START,
})

/**
 * @param {string} error
 * @returns {Object}
 */
export const loadingObjectsError = error => ({
    type: LOADING_OBJECTS_ERROR,
    payload: { error },
})

/**
 * @param {Object[]} programs
 * @returns {Object}
 */
export const setObjects = objects => ({
    type: SET_OBJECTS,
    payload: { objects },
})
