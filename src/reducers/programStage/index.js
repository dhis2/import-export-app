import {
    LOADING_PROGRAM_STAGES_ERROR,
    LOADING_PROGRAM_STAGES_START,
    SET_PROGRAM_STAGES,
} from './actions'

export * from './actions'
export * from './selectors'
export * from './thunks'

export const programStageDefaultState = {
    loading: false,
    loaded: false,
    error: '',
    data: [],
}

export default function programStageReducer(
    state = programStageDefaultState,
    { type, payload } = {}
) {
    if (type === LOADING_PROGRAM_STAGES_START) {
        return { ...state, loading: true, error: '' }
    }

    if (type === LOADING_PROGRAM_STAGES_ERROR) {
        return { ...state, loading: false, error: payload.error }
    }

    if (type === SET_PROGRAM_STAGES) {
        return {
            ...state,
            loading: false,
            loaded: true,
            data: payload.programStages,
        }
    }

    return state
}
