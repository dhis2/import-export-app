import { SCHEMAS_SET } from './actions'

const initialState = { loaded: false, loading: true, error: false, list: [] }
const loadedState = { loaded: true, loading: false, error: false }

export * from './actions'

export default function schemasReducer(state = initialState, action) {
    const { type, payload } = action

    if (type === SCHEMAS_SET) {
        return { ...loadedState, list: payload }
    }

    return state
}
