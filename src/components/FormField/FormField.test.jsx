import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect.js'

import { FormField } from '../index.js'

const props = {
    dataTest: 'format',
    label: 'Format',
}

it('matches snapshot', () => {
    const { asFragment } = render(<FormField {...props} />)
    expect(asFragment()).toMatchSnapshot()
})

it('shows children', () => {
    const r = (
        <FormField {...props}>
            <p>Child paragraph 1</p>
        </FormField>
    )
    const { getByDataTest } = render(r)
    const ff = getByDataTest('format')
    expect(ff).toHaveTextContent('Child paragraph 1')
})

it('shows star when required', () => {
    const r = (
        <FormField {...props} required>
            <p>Child paragraph 1</p>
        </FormField>
    )
    const { getByDataTest } = render(r)
    const ff = getByDataTest('format')
    expect(ff).toContainHTML('<span> *</span>')
})
