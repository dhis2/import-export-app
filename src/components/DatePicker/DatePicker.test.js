import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { DatePicker } from '../index'

const props = {
    dataTest: 'date-picker',
    name: 'file',
    label: 'Start date',
    date: '2020-02-10',
    onChange: () => 1,
}

it('matches snapshot', () => {
    const { asFragment } = render(<DatePicker {...props} />)
    expect(asFragment()).toMatchSnapshot()
})
