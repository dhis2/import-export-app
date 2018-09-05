import React from 'react'
import { Logger } from '../'

const wrapper = mount(<Logger />)
wrapper.setState({
  open: true,
  list: [
    {
      id: new Date().getTime(),
      d: new Date(),
      subject: 'Subject',
      text: 'some message'
    }
  ]
})

describe('Logger', () => {
  it('Title', () => {
    expect(wrapper.containsMatchingElement(<span>Logger</span>)).toBe(true)
  })

  it('Description', () => {
    expect(
      wrapper.containsMatchingElement(
        <span>view messages received on using import/export forms.</span>
      )
    ).toBe(true)
  })

  it('Log message contents', () => {
    expect(wrapper.containsMatchingElement(<div>some message</div>)).toBe(true)
  })
})
