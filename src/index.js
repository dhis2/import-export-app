import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import './locales'
import './index.css'
import App from './App'
import { store } from './store'
import { apiConfig } from 'config'
import { init } from 'd2/lib/d2'
import * as serviceWorker from './serviceWorker';

/**
 * Initialize d2
 */

const { server, version } = apiConfig

init({
    baseUrl: `${server}/api/${version}`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
})

/**
 * Initialize material ui theme
 */

lightBaseTheme.palette.primary1Color = '#4c708c'
lightBaseTheme.palette.primary2Color = '#4c708c'
lightBaseTheme.palette.primary3Color = '#4c708c'
lightBaseTheme.palette.pickerHeaderColor = '#4c708c'

const muiTheme = getMuiTheme(lightBaseTheme)

/**
 * Mount app
 */

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

/**
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */

serviceWorker.unregister();
