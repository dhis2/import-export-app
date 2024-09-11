import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect.js'

import { allJobs } from '../../JobOverview/__test__/data.js'
import { Details } from '../Details/Details.jsx'

const props = {
    details: allJobs[0].jobDetails,
}

it(`matches snapshot`, () => {
    const { asFragment } = render(<Details {...props} />)
    expect(asFragment()).toMatchSnapshot()
})
