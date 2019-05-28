import { combineReducers } from 'redux'
import user from './user'
import schemas from './schemas'

export * from './user/actions'
export * from './schemas/actions'

export default combineReducers({
    user,
    schemas,
})
