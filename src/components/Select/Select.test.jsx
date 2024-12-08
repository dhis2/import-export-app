import React from 'react'
import { render } from 'test-utils'

import { Select } from '../index.js'

const options = [
    { value: 'a', label: 'Abc' },
    { value: 'b', label: 'Def' },
    { value: 'c', label: 'Ghi' },
]

const setValue = jest.fn().mockName('setValue')

const props = {
    name: 'object-type',
    label: 'Object type',
    options: options,
    checked: options[0],
    setValue: setValue,
    meta: {},
    dataTest: 'select-object-type',
}

it('matches snapshot', () => {
    const { asFragment } = render(<Select {...props} />)
    expect(asFragment()).toMatchSnapshot()
})
