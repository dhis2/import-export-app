import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui'
import React from 'react'
import ReactDOM from 'react-dom'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import App from './App'
import { configureStore } from './configureStore'

jest.mock('./configureStore')

const muiTheme = getMuiTheme(lightBaseTheme)
const store = configureStore()

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <Provider store={store}>
            <MuiThemeProvider muiTheme={muiTheme}>
                <HashRouter>
                    <App />
                </HashRouter>
            </MuiThemeProvider>
        </Provider>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})
