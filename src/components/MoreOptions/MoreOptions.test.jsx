import React from 'react'
import { render } from 'test-utils'

import { MoreOptions } from '../index.js'

const renderMoreOptions = (initiallyVisible, props) =>
    render(
        <MoreOptions {...props} initiallyVisible={initiallyVisible}>
            <p>Child paragraph</p>
        </MoreOptions>
    )

const props = {
    dataTest: 'more-options',
}

describe('matches snapshot', () => {
    it('when not toggled', () => {
        const { asFragment } = renderMoreOptions(false, props)
        expect(asFragment()).toMatchSnapshot()
    })

    it('when toggled', () => {
        const { asFragment } = renderMoreOptions(true, props)
        expect(asFragment()).toMatchSnapshot()
    })

    it('when toggled and different label', () => {
        const { asFragment } = renderMoreOptions(true, {
            ...props,
            label: 'Details',
        })
        expect(asFragment()).toMatchSnapshot()
    })
})
