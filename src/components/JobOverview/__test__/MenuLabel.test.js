import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { tasksState } from './data'
import { MenuLabel } from '../MenuLabel'

const allJobs = ['data', 'event', 'gml', 'metadata']
    .map(type => Object.keys(tasksState[type]).map(id => tasksState[type][id]))
    .flat()

it('matches snapshot', () => {
    const { asFragment } = render(<MenuLabel task={allJobs[0]} />)
    expect(asFragment()).toMatchSnapshot()
})
