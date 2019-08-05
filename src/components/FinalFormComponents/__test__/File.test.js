import React from 'react'
import { File } from '../File'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

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
        const file = shallow(<File name="upload" />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
