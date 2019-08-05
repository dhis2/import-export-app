import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
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
        const file = shallow(<IdScheme />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
