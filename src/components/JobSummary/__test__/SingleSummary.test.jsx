import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect.js'

import { SingleSummary } from '../SingleSummary/SingleSummary.jsx'

const props = {
    importCount: { imported: 1, deleted: 2, ignored: 3, updated: 4, total: 10 },
    status: 'WARNING',
    description: 'Import process completed successfully',
    conflicts: [
        { object: 'a', value: 'conflict a value' },
        { object: 'b', value: 'conflict b value' },
    ],
    id: '1',
}

it(`matches snapshot`, () => {
    const { asFragment } = render(<SingleSummary {...props} />)
    expect(asFragment()).toMatchSnapshot()
})
