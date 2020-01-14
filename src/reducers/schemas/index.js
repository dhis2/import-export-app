import {
    LOADING_SCHEMAS_START,
    LOADING_SCHEMAS_ERROR,
    LOADING_SCHEMAS_DONE,
} from './actions'
export * from './actions'

const initialState = {
    loaded: false,
    loading: false,
    error: '',
    list: [],
}

export default function schemasReducer(
    state = initialState,
    { type, payload }
) {
    if (type === LOADING_SCHEMAS_START) {
        return {
            ...state,
            loading: true,
            error: '',
        }
    }

    if (type === LOADING_SCHEMAS_ERROR) {
        return {
            ...state,
            loading: false,
            error: payload,
        }
    }

    if (type === LOADING_SCHEMAS_DONE) {
        return {
            ...state,
            loaded: true,
            loading: false,
            list: payload,
        }
    }

    return state
}
