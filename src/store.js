import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

export * from './reducers/user/actions'

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(reduxThunk))
)

export { store }
