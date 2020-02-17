import React from 'react'
import { render, fireEvent, cleanup } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { Switch } from '.'

const setChecked = jest.fn().mockName('setChecked')

const props = {
    name: 'preheat-cache',
    label: 'Preheat cache',
    help: 'Faster for large imports',
    checked: false,
    setChecked: setChecked,
    dataTest: 'switch-preheat-cache',
}

afterEach(() => {
    cleanup()
    jest.clearAllMocks()
})

test('toggling triggers setChecked', () => {
    const { getByDataTest } = render(<Switch {...props} />)
    const sw = getByDataTest('dhis2-uicore-switch')
    fireEvent.click(sw)
    expect(setChecked).toHaveBeenCalledTimes(1)
    expect(setChecked).toHaveBeenCalledWith(true)
})

it('matches snapshot', () => {
    const { asFragment } = render(<Switch {...props} />)
    expect(asFragment()).toMatchSnapshot()
})
