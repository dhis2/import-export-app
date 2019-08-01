import React from 'react'
import renderer from 'react-test-renderer'
import { SkipExistingCheck } from '../SkipExistingCheck'

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

describe('Input component - SkipExistingCheck', () => {
    it('should render correctly', () => {
        const file = renderer.create(<SkipExistingCheck />).toJSON()

        expect(file).toMatchSnapshot()
    })
})
