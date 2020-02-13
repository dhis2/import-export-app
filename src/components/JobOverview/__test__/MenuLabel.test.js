import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { allJobs } from './data'
import { MenuLabel } from '../MenuLabel'

it('matches snapshot', () => {
    const { asFragment } = render(<MenuLabel task={allJobs[0]} />)
    expect(asFragment()).toMatchSnapshot()
})
