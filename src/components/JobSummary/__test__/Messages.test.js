import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { Messages } from '../Messages'

const props = {
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
    const { asFragment } = render(<Messages {...props} />)
    expect(asFragment()).toMatchSnapshot()
})
