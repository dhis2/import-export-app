import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect.js'

import { Log } from '../Log/Log.jsx'

const props = {
    events: [
        {
            date: new Date('2020-01-01T00:00:00'),
            text: 'First day of year',
            id: 'Jan',
        },
        {
            date: new Date('2020-01-02T00:00:00'),
            text: 'Snd day of year',
            id: 'Jan2',
        },
        {
            date: new Date('2020-12-31T00:00:00'),
            text: 'Last day of year',
            id: 'Dec',
        },
    ],
}

it(`matches snapshot`, () => {
    const { asFragment } = render(<Log {...props} />)
    expect(asFragment()).toMatchSnapshot()
})
