import React from 'react'
import renderer from 'react-test-renderer'
import { MuiThemeProvider } from 'material-ui'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { MoreOptions } from '../MoreOptions'

describe('Input component - MoreOptions', () => {
    const muiTheme = getMuiTheme(lightBaseTheme)

    it('should render correctly & hide content', () => {
        const file = renderer
            .create(
                <MuiThemeProvider muiTheme={muiTheme}>
                    <MoreOptions>
                        <span>Foo</span>
                        <span>Bar</span>
                        <span>Baz</span>
                    </MoreOptions>
                </MuiThemeProvider>
            )
            .toJSON()

        expect(file).toMatchSnapshot()
    })

    it('should render correctly & show content', () => {
        const file = renderer
            .create(
                <MuiThemeProvider muiTheme={muiTheme}>
                    <MoreOptions openInitially>
                        <span>Foo</span>
                        <span>Bar</span>
                        <span>Baz</span>
                    </MoreOptions>
                </MuiThemeProvider>
            )
            .toJSON()

        expect(file).toMatchSnapshot()
    })
})
