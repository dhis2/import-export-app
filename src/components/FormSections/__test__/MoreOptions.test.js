import React from 'react'
import { mount } from 'enzyme'
import { MuiThemeProvider } from 'material-ui'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { MoreOptions } from '../MoreOptions'

describe('Input component - MoreOptions', () => {
    const muiTheme = getMuiTheme(lightBaseTheme)

    it('should render correctly & hide content', () => {
        const file = mount(
            <MuiThemeProvider muiTheme={muiTheme}>
                <MoreOptions>
                    <span>Foo</span>
                    <span>Bar</span>
                    <span>Baz</span>
                </MoreOptions>
            </MuiThemeProvider>
        )

        const content = file.find('.content')
        expect(content.get(0).props.className).not.toMatch(/show/)
    })

    it('should render correctly & show content', () => {
        const file = mount(
            <MuiThemeProvider muiTheme={muiTheme}>
                <MoreOptions openInitially>
                    <span>Foo</span>
                    <span>Bar</span>
                    <span>Baz</span>
                </MoreOptions>
            </MuiThemeProvider>
        )

        const content = file.find('.content')
        expect(content.get(0).props.className).toMatch(/show/)
    })
})
