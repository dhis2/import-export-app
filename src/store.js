import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

export * from './reducers/user/actions'

export const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(reduxThunk))
)
