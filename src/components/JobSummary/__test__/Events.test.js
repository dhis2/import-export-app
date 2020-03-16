import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { Events } from '../Events/Events'

const props = {
    events: [
        { date: new Date('2020-01-01'), text: 'First day of year', id: 'Jan' },
        { date: new Date('2020-01-02'), text: 'Snd day of year', id: 'Jan2' },
        { date: new Date('2020-12-31'), text: 'Last day of year', id: 'Dec' },
    ],
}

it(`matches snapshot`, () => {
    const { asFragment } = render(<Events {...props} />)
    expect(asFragment()).toMatchSnapshot()
})
