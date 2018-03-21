import { combineReducers } from 'redux'

import user from './user'

export * from 'reducers/user/actions'

export default combineReducers({
  user,
})
