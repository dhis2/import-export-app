import { combineReducers } from 'redux'

import user from './user'
import schemas from './schemas'
export * from 'reducers/user/actions'
export * from 'reducers/schemas/actions'

export default combineReducers({
    user,
    schemas,
})
