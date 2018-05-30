import React from 'react'
import MoreOptions from '../'

const wrapper = shallow(<MoreOptions />)

describe('FormBase', () => {
  it('contains <div/>', () => {
    expect(wrapper.find('div').exists()).toBe(true)
  })
})
