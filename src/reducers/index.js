import { combineReducers } from 'redux'

import attributes from './attributes'
import dataSets from './dataSets'
import schemas from './schemas'
import user from './user'
import orgUnit from './orgUnits'

export * from './user/actions'
export * from './schemas/actions'
export * from './attributes/actions'
export * from './dataSets/actions'
export * from './orgUnits/actions'

export default combineReducers({
    user,
    schemas,
    attributes,
    dataSets,
    orgUnit,
})
