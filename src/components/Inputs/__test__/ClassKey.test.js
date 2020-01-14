import { useForm } from 'react-final-form'
import React from 'react'

import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { CLASS_KEY_KEY, ClassKey } from '../ClassKey'

jest.mock('react-final-form')

describe('Input component - ClassKey', () => {
    React.useEffect = jest.fn(callback => callback())

    const defaultValue = 'foo'
    const options = [
        { value: 'foo', label: 'Foo' },
        { value: 'bar', label: 'Bar' },
    ]

    beforeEach(() => {
        useForm.mockClear()
        React.useEffect.mockClear()
    })

    it('should render correctly', () => {
        useForm.mockImplementationOnce(() => ({
            change: jest.fn(),
            getState: () => ({ values: { [CLASS_KEY_KEY]: 'foo' } }),
        }))

        const file = shallow(
            <ClassKey
                show={true}
                options={options}
                defaultValue={defaultValue}
            />
        )
        expect(toJson(file)).toMatchSnapshot()
    })

    it('should remove the value from the form state when show is false and there is a value', () => {
        const change = jest.fn()
        useForm.mockImplementationOnce(() => ({
            change,
            getState: () => ({ values: { [CLASS_KEY_KEY]: 'foo' } }),
        }))

        const file = shallow(
            <ClassKey
                show={false}
                options={options}
                defaultValue={defaultValue}
            />
        )
        expect(change).toHaveBeenCalledTimes(1)
        expect(change).toHaveBeenCalledWith(CLASS_KEY_KEY, null)
    })
})
