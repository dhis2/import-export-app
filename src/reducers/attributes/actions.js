export const LOADING_ATTRIBUTES_START = 'LOADING_ATTRIBUTES_START'
export const LOADING_ATTRIBUTES_ERROR = 'LOADING_ATTRIBUTES_ERROR'
export const SET_ATTRIBUTES = 'SET_ATTRIBUTES'

export const loadingAttributesStart = () => ({
    type: LOADING_ATTRIBUTES_START,
})

export const loadingAttributesError = error => ({
    type: LOADING_ATTRIBUTES_ERROR,
    payload: error,
})

export const setAttribute = (type, attributes) => ({
    type: SET_ATTRIBUTES,
    payload: { type, attributes },
})
