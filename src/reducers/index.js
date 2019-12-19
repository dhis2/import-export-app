import { combineReducers } from 'redux'

import user from './user'
import attributes from './attributes'

export * from 'reducers/user/actions'
export * from './attributes/actions'

export default combineReducers({
    user,
    attributes,
})
