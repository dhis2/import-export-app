import React from 'react'
import { mount } from 'enzyme'
import Schemas from '../'
import { Loading } from '../../../Loading'

import { MuiThemeProvider } from 'material-ui'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiTheme = getMuiTheme(lightBaseTheme)

describe('Schemas', () => {
    it('empty render', () => {
        const wrapper = mount(
            <MuiThemeProvider muiTheme={muiTheme}>
                <Schemas name="schema" label="Schema" />
            </MuiThemeProvider>
        )

        expect(wrapper.containsAllMatchingElements([<Loading />])).toEqual(true)
    })
})
