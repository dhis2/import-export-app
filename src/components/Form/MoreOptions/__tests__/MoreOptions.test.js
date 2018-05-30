import MoreOptions from '../'

let wrapper
beforeAll(() => {
  wrapper = shallow(<MoreOptions />)
})

describe('FormBase', () => {
  it('contains <div/>', () => {
    expect(wrapper.find('div').exists()).toBe(true)
  })
})
