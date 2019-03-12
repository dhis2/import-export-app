import React from 'react'
import { mount } from 'enzyme'
import Radio from '../'
import { MuiThemeProvider } from 'material-ui'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import i18n from '@dhis2/d2-i18n/index'

const muiTheme = getMuiTheme(lightBaseTheme)

describe('Radio', () => {
    it('renders', () => {
        const selected = 'json'
        const values = [
            {
                value: 'json',
                label: i18n.t('JSON'),
            },
            {
                value: 'xml',
                label: i18n.t('XML'),
            },
            {
                value: 'csv',
                label: i18n.t('CSV'),
            },
        ]
        const wrapper = mount(
            <MuiThemeProvider muiTheme={muiTheme}>
                <Radio values={values} selected={selected} />
            </MuiThemeProvider>
        )
        expect(wrapper.find('div').length > 0).toEqual(true)
    })
})
