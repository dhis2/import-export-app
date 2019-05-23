import React from 'react'
import { mount } from 'enzyme'
import { MuiThemeProvider } from 'material-ui'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Loading } from '../'

const muiTheme = getMuiTheme(lightBaseTheme)
let wrapper

beforeAll(() => {
    wrapper = mount(
        <MuiThemeProvider muiTheme={muiTheme}>
            <Loading />
        </MuiThemeProvider>
    )
})

describe('Loading', () => {
    it('contains svg elm. <circle />', () => {
        expect(wrapper.find('circle').exists()).toBe(true)
    })
})
