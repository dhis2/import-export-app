import { USER_SET, USER_CLEAR } from './actions'

const initialState = null

export default function userReducer(state = initialState, action) {
  const { type, payload } = action

  if (type === USER_SET) {
    return { ...payload }
  } else if (type === USER_CLEAR) {
    return null
  }

  return state
}
