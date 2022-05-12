import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { allJobs } from '../../JobOverview/__test__/data'
import { Summary } from '../Summary/Summary'

describe('different job type summaries', () => {
    const oneOfEach = [
        allJobs.find((j) => j.importType == 'DATAVALUE_IMPORT'),
        allJobs.find((j) => j.importType == 'EVENT_IMPORT'),
        allJobs.find((j) => j.importType == 'GML_IMPORT'),
        allJobs.find((j) => j.importType == 'METADATA_IMPORT'),
    ]

    oneOfEach.forEach((j) =>
        it(`matches snapshot - ${j.importType}`, () => {
            const { asFragment } = render(<Summary summary={j.summary} />)
            expect(asFragment()).toMatchSnapshot()
        })
    )
})
