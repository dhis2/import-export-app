import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from 'material-ui'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Schemas from '../'
import { Loading } from '../../../Loading'
import { configureStore } from '../../../../configureStore'

jest.mock('../../../../configureStore')

const muiTheme = getMuiTheme(lightBaseTheme)
const store = configureStore()
const Wrapper = props => (
    <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
            {props.children}
        </MuiThemeProvider>
    </Provider>
)

describe('Schemas', () => {
    it('empty render', () => {
        const wrapper = mount(
            <Wrapper>
                <Schemas name="schema" label="Schema" store={store} />
            </Wrapper>
        )

        expect(wrapper.containsAllMatchingElements([<Loading />])).toEqual(true)
    })
})
