import {
    LOADING_DATA_SETS_DONE,
    LOADING_DATA_SETS_ERROR,
    LOADING_DATA_SETS_START,
    SET_DATA_SETS_FILTER,
} from './actions'

export * from './actions'
export * from './selectors'
export * from './thunks'

export const dataSetsDefaultState = {
    error: '',
    data: [],
    loaded: false,
    loading: false,
    filter: '',
}

export default function dataSets(
    state = dataSetsDefaultState,
    { type, payload } = {}
) {
    if (type === LOADING_DATA_SETS_START) {
        return { ...state, loading: true, error: '' }
    }

    if (type === LOADING_DATA_SETS_ERROR) {
        return { ...state, loading: false, error: payload.error }
    }

    if (type === LOADING_DATA_SETS_DONE) {
        return {
            ...state,
            loading: false,
            loaded: true,
            data: payload.dataSets,
        }
    }

    if (type === SET_DATA_SETS_FILTER) {
        return { ...state, filter: payload.filter }
    }

    return state
}
