import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { Strategy } from '../Strategy'

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

describe('Input component - Strategy', () => {
    it('should render correctly', () => {
        const file = shallow(<Strategy />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
