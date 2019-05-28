import React from 'react'
import { mount } from 'enzyme'
import File from './'
import { MuiThemeProvider } from 'material-ui'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiTheme = getMuiTheme(lightBaseTheme)

describe('File', () => {
    it('render', () => {
        const wrapper = mount(
            <MuiThemeProvider muiTheme={muiTheme}>
                <File name="test" label="Test File" />
            </MuiThemeProvider>
        )
        expect(wrapper.find('input').length === 1).toEqual(true)
    })
})
