import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { allJobs } from '../../JobOverview/__test__/data'
import { Details } from '../Details'

const props = {
    details: allJobs[0].jobDetails,
}

it(`matches snapshot`, () => {
    const { asFragment } = render(<Details {...props} />)
    expect(asFragment()).toMatchSnapshot()
})
