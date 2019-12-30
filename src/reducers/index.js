import { combineReducers } from 'redux'

import attributes from './attributes'
import dataSets from './dataSets'
import schemas from './schemas'
import user from './user'

export * from './user/actions'
export * from './schemas/actions'
export * from './attributes/actions'
export * from './dataSets/actions'

export default combineReducers({
    user,
    schemas,
    attributes,
    dataSets,
})
