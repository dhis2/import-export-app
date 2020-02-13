import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { Tag } from '../Tag'

const propMake = type => ({
    [type]: true,
    text: `${type} message`,
})

describe('different tag types', () => {
    const allTypes = ['success', 'warning', 'error', 'info']

    allTypes.forEach(t =>
        it(`matches snapshot - ${t}`, () => {
            const { asFragment } = render(<Tag {...propMake(t)} />)
            expect(asFragment()).toMatchSnapshot()
        })
    )
})
