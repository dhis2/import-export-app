import React from 'react'
import { render, fireEvent, cleanup } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { RadioGroup } from '../index'

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
    checked: options[0],
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
    expect(setValue).toHaveBeenCalledWith({ value: 'b', label: 'Def' })
})

it('matches snapshot', () => {
    const { asFragment } = render(<RadioGroup {...props} />)
    expect(asFragment()).toMatchSnapshot()
})
