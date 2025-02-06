import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect.js'

import { MenuLabel } from '../MenuLabel/MenuLabel.jsx'
import { allJobs } from './data.js'

it('matches snapshot', () => {
    const { asFragment } = render(<MenuLabel task={allJobs[0]} />)
    expect(asFragment()).toMatchSnapshot()
})
