import {
    LOADING_ATTRIBUTES_ERROR,
    LOADING_ATTRIBUTES_START,
    SET_ATTRIBUTES,
} from './actions'

const initialState = {
    loading: false,
    error: '',

    dataElement: [],
    organisationUnit: [],
}

export default function attributesReducer(
    state = initialState,
    { type, payload } = {}
) {
    if (type === LOADING_ATTRIBUTES_START) {
        return {
            ...state,
            loading: true,
            error: '',
        }
    }

    if (type === LOADING_ATTRIBUTES_ERROR) {
        return {
            ...state,
            loading: false,
            error: payload,
        }
    }

    if (type === SET_ATTRIBUTES) {
        return {
            ...state,
            loading: false,
            [payload.type]: payload.attributes,
        }
    }

    return state
}
