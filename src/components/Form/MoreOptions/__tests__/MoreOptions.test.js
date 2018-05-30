import { mount } from 'enzyme'
import MoreOptions from '../'

import { MuiThemeProvider } from 'material-ui'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
const muiTheme = getMuiTheme(lightBaseTheme)

let wrapper
beforeAll(() => {
  wrapper = mount(
    <MuiThemeProvider muiTheme={muiTheme}>
      <MoreOptions />
    </MuiThemeProvider>
  )
})

describe('FormBase', () => {
  it('contains <div/>', () => {
    expect(wrapper.find('div').exists()).toBe(true)
  })
})
