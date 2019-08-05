import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { PreheatCache } from '../PreheatCache'

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

describe('Input component - PreheatCache', () => {
    it('should render correctly', () => {
        const file = shallow(<PreheatCache />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
