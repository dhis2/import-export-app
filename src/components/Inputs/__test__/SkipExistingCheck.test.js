import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
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
        const file = shallow(<SkipExistingCheck />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
