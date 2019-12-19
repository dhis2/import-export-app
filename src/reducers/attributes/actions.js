export const LOADING_ATTRIBUTES_START = 'LOADING_ATTRIBUTES_START'
export const LOADING_ATTRIBUTES_ERROR = 'LOADING_ATTRIBUTES_ERROR'
export const SET_ATTRIBUTES = 'SET_ATTRIBUTES'

/**
 * @param {string} type
 * @returns {Object}
 */
export const loadingAttributesStart = type => ({
    type: LOADING_ATTRIBUTES_START,
    payload: type,
})

/**
 * @param {string} type
 * @param {string} message
 */
export const loadingAttributesError = (type, error) => ({
    type: LOADING_ATTRIBUTES_ERROR,
    payload: { type, error },
})

/**
 * @param {string} type
 * @param {Object} attributes
 * @param {string} attributes.id
 * @param {string} attributes.displayName
 * @returns {Object}
 */
export const setAttribute = (type, attributes) => ({
    type: SET_ATTRIBUTES,
    payload: { type, attributes },
})
