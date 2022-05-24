import React from 'react'
import { render, fireEvent, cleanup } from 'test-utils'
import '@testing-library/jest-dom/extend-expect.js'

import { RadioGroup } from '../index.js'

const options = [
    { value: 'a', label: 'Abc' },
    { value: 'b', label: 'Def' },
    { value: 'c', label: 'Ghi' },
]

const setValue = jest.fn().mockName('setValue')

const props = {
    name: 'format',
    label: 'Format',
    options: options,
    checked: options[0].value,
    setValue: setValue,
    dataTest: 'radio-group-format',
}

afterEach(() => {
    cleanup()
    jest.clearAllMocks()
})

test('clicking on an option triggers setValue', () => {
    const { getByDataTest } = render(<RadioGroup {...props} />)
    const def = getByDataTest('radio-group-format-b')
    expect(def).toHaveTextContent('Def')
    fireEvent.click(def)
    expect(setValue).toHaveBeenCalledTimes(1)
    expect(setValue).toHaveBeenCalledWith('b')
})

it('matches snapshot', () => {
    const { asFragment } = render(<RadioGroup {...props} />)
    expect(asFragment()).toMatchSnapshot()
})
