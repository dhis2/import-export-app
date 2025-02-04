import React from 'react'
import { render } from 'test-utils'

import { TypeReportSummary } from '../TypeReportSummary/TypeReportSummary.jsx'

const props = {
    overviewStats: {
        imported: 1,
        deleted: 2,
        ignored: 3,
        updated: 4,
        total: 10,
    },
    stats: [
        {
            type: 'DefaultGmlImportService',
            created: 1,
            deleted: 2,
            ignored: 3,
            updated: 4,
            total: 10,
        },
        {
            type: 'SndGmlImportService',
            created: 1,
            deleted: 2,
            ignored: 3,
            updated: 4,
            total: 10,
        },
    ],
    messages: [
        {
            uid: 'abc',
            type: 'DefaultGmlImportService',
            property: 'def',
            message: 'message one',
        },
        {
            uid: 'xyz',
            type: 'SndGmlImportService',
            property: 'def',
            message: 'message one',
        },
    ],
}

it(`matches snapshot`, () => {
    const { asFragment } = render(<TypeReportSummary {...props} />)
    expect(asFragment()).toMatchSnapshot()
})
