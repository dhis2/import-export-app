import { combineReducers } from 'redux'

import user from './user'
import schemas from './schemas'
import attributes from './attributes'

export * from 'reducers/user/actions'
export * from 'reducers/schemas/actions'
export * from './attributes/actions'

export default combineReducers({
    user,
    schemas,
    attributes,
})
