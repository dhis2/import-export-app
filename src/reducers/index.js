import { combineReducers } from 'redux'
import user from './user'
import schemas from './schemas'
import attributes from './attributes'

export * from './user/actions'
export * from './schemas/actions'
export * from './attributes/actions'

export default combineReducers({
    user,
    schemas,
    attributes,
})
