import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { Select } from '.'

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
    dataTest: 'select-object-type',
}

it('matches snapshot', () => {
    const { asFragment } = render(<Select {...props} />)
    expect(asFragment()).toMatchSnapshot()
})
