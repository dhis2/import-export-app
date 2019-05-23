import React from 'react'
import MoreOptions from './'
import { MuiThemeProvider } from 'material-ui'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

lightBaseTheme.palette.primary1Color = '#4c708c'
lightBaseTheme.palette.primary2Color = '#4c708c'
lightBaseTheme.palette.primary3Color = '#4c708c'
lightBaseTheme.palette.pickerHeaderColor = '#4c708c'

const muiTheme = getMuiTheme(lightBaseTheme)

describe('MoreOptions', () => {
    it('enabled: false', () => {
        const wrapper = mount(
            <MuiThemeProvider muiTheme={muiTheme}>
                <MoreOptions enabled={false} />
            </MuiThemeProvider>
        )
        expect(
            wrapper.containsAllMatchingElements([
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />,
                <path d="M0 0h24v24H0z" fill="none" />,
            ])
        ).toBe(true)
    })

    it('enabled: true', () => {
        const wrapper = mount(
            <MuiThemeProvider muiTheme={muiTheme}>
                <MoreOptions enabled={true} />
            </MuiThemeProvider>
        )
        expect(
            wrapper.containsAllMatchingElements([
                <path d="M19 13H5v-2h14v2z" />,
                <path d="M0 0h24v24H0z" fill="none" />,
            ])
        ).toBe(true)
    })
})
