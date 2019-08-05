import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { DryRun } from '../DryRun'

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

describe('Input component - DryRun', () => {
    it('should render correctly', () => {
        const file = shallow(<DryRun />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
