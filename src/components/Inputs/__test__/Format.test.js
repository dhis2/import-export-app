import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { Format, OPTION_CSV, OPTION_JSON, OPTION_XML } from '../Format'

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

describe('Input component - Format', () => {
    it('should render correctly', () => {
        const file = shallow(
            <Format options={[OPTION_JSON, OPTION_XML, OPTION_CSV]} />
        )
        expect(toJson(file)).toMatchSnapshot()
    })
})
