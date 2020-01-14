import { USER_SET, USER_CLEAR } from './actions'

const initialState = null

export default function userReducer(state = initialState, { type, payload }) {
    if (type === USER_SET) {
        return { ...payload }
    } else if (type === USER_CLEAR) {
        return null
    }

    return state
}
