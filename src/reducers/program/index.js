import {
    LOADING_PROGRAMS_ERROR,
    LOADING_PROGRAMS_START,
    SET_PROGRAMS,
} from './actions'

export * from './actions'
export * from './selectors'
export * from './thunks'

export const programDefaultState = {
    loading: false,
    loaded: false,
    error: '',
    data: [],
}

export default function programReducer(
    state = programDefaultState,
    { type, payload }
) {
    if (type === LOADING_PROGRAMS_START) {
        return { ...state, loading: true, error: '' }
    }

    if (type === LOADING_PROGRAMS_ERROR) {
        return { ...state, loading: false, error: payload.error }
    }

    if (type === SET_PROGRAMS) {
        return {
            ...state,
            loading: false,
            loaded: true,
            data: payload.programs,
        }
    }

    return state
}
