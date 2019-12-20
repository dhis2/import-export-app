import { compose, createStore, applyMiddleware } from 'redux'
import reducers from '../reducers'
import reduxThunk from 'redux-thunk'

export const configureStore = () =>
    createStore(reducers, compose(applyMiddleware(reduxThunk)))
