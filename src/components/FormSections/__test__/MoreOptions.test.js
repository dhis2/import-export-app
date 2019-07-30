import React, { useState } from 'react'
import renderer from 'react-test-renderer'
import { MoreOptions } from '../MoreOptions'

jest.mock('react', () => ({
    useState: initial => [initia, jest.fn()],
}))

describe('Input component - MoreOptions', () => {
    it('should render correctly & hide content', () => {
        const file = renderer
            .create(
                <MoreOptions>
                    <span>Foo</span>
                    <span>Bar</span>
                    <span>Baz</span>
                </MoreOptions>
            )
            .toJSON()

        expect(file).toMatchSnapshot()
    })

    it('should render correctly & show content', () => {
        useState.mockImplementationOnce(() => [true, jest.fn()])

        const file = renderer
            .create(
                <MoreOptions>
                    <span>Foo</span>
                    <span>Bar</span>
                    <span>Baz</span>
                </MoreOptions>
            )
            .toJSON()

        expect(file).toMatchSnapshot()
    })
})
