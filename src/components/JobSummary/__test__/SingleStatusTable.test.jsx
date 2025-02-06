import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect.js'

import { SingleStatusTable } from '../SingleStatusTable/SingleStatusTable.jsx'

const props = {
    status: 'WARNING',
    description: 'Import process completed successfully',
}

it(`matches snapshot`, () => {
    const { asFragment } = render(<SingleStatusTable {...props} />)
    expect(asFragment()).toMatchSnapshot()
})
