import React from 'react'
import renderer from 'react-test-renderer'
import { IdScheme } from '../idScheme'

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

describe('Input component - IdScheme', () => {
    it('should render correctly', () => {
        const file = renderer.create(<IdScheme />).toJSON()

        expect(file).toMatchSnapshot()
    })
})
