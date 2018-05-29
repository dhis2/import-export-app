import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'

import { Loading } from '../'

import { MuiThemeProvider } from 'material-ui'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
const muiTheme = getMuiTheme(lightBaseTheme)

configure({ adapter: new Adapter() })

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
