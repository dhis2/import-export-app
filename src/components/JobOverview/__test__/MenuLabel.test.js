import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { MenuLabel } from '../MenuLabel/MenuLabel'
import { allJobs } from './data'

it('matches snapshot', () => {
    const { asFragment } = render(<MenuLabel task={allJobs[0]} />)
    expect(asFragment()).toMatchSnapshot()
})
