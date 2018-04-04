import { createStore } from 'redux'
import reducers from './reducers'

export * from './reducers/user/actions'

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export { store }
