import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { MuiThemeProvider } from 'material-ui'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import './locales'
import moment from 'moment'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'

import './index.css'
import App from './App'

import { store } from './store'

import { apiConfig } from 'config'
import { init } from 'd2/lib/d2'
const { server, version } = apiConfig
init({
  baseUrl: `${server}/api/${version}`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#4c708c'
//     }
//   }
// })

const muiTheme = getMuiTheme(lightBaseTheme)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <HashRouter>
        <App />
      </HashRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
