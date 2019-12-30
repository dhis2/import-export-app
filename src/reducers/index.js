import { combineReducers } from 'redux'

import attributes from './attributes'
import dataSets from './dataSets'
import schemas from './schemas'
import user from './user'
import orgUnit from './orgUnits'
import program from './program'
import programStage from './programStage'

export * from './user/actions'
export * from './schemas/actions'
export * from './attributes/actions'
export * from './dataSets/actions'
export * from './orgUnits/actions'
export * from './program/actions'
export * from './programStage/actions'

export default combineReducers({
    attributes,
    dataSets,
    orgUnit,
    program,
    programStage,
    schemas,
    user,
})
