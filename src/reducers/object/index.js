import {
    LOADING_OBJECTS_ERROR,
    LOADING_OBJECTS_START,
    SET_OBJECTS,
} from './actions'

export * from './actions'
export * from './selectors'
export * from './thunks'

export const objectDefaultState = {
    loading: false,
    loaded: false,
    error: '',
    data: [],
}

export default function objectReducer(
    state = objectDefaultState,
    { type, payload } = {}
) {
    if (type === LOADING_OBJECTS_START) {
        return { ...state, loading: true, error: '' }
    }

    if (type === LOADING_OBJECTS_ERROR) {
        return { ...state, loading: false, error: payload.error }
    }

    if (type === SET_OBJECTS) {
        return {
            ...state,
            loading: false,
            loaded: true,
            data: payload.objects,
        }
    }

    return state
}
