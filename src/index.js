import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import moment from 'moment'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'

import './index.css'
import App from './App'

import { store } from './store'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
        <App />
      </MuiPickersUtilsProvider>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)
