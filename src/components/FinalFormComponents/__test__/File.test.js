import React from 'react'
import renderer from 'react-test-renderer'
import { File } from '../File'

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

describe('Form component - File', () => {
    it('should render correctly', () => {
        const file = renderer.create(<File name="upload" />).toJSON()

        expect(file).toMatchSnapshot()
    })
})
