import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui'

import './locales'
import moment from 'moment'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'

import './index.css'
import App from './App'

import { store } from './store'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4c708c'
    }
  }
})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <HashRouter>
        <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
          <App />
        </MuiPickersUtilsProvider>
      </HashRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
