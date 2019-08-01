import React from 'react'
import renderer from 'react-test-renderer'
import { DataElementIdScheme } from '../DataElementIdScheme'

jest.mock('react-final-form', () => ({
    useField: jest.fn(() => ({
        input: {
            name: 'Name',
            value: '',
            onChange: jest.fn(),
        },
        meta: {
            touched: false,
            error: '',
        },
    })),
}))

describe('Input component - DataElementIdScheme', () => {
    it('should render correctly', () => {
        const file = renderer.create(<DataElementIdScheme />).toJSON()

        expect(file).toMatchSnapshot()
    })
})
