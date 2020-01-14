import React from 'react'

import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import { IdScheme } from '../idScheme'
import {
    getSharedAttributes,
    getSharedAttributesLoading,
} from '../../../reducers/attributes/selectors'

jest.mock('react-final-form')

jest.mock('react-redux', () => ({
    useSelector: jest.fn(selector => selector()),
    useDispatch: jest.fn(() => () => null),
}))

jest.mock('../../../reducers/attributes/selectors', () => ({
    getSharedAttributes: jest.fn(() => []),
    getSharedAttributesLoading: jest.fn(() => false),
}))

describe('Input component - IdScheme', () => {
    it('should show the loading state when data is being loaded', () => {
        getSharedAttributesLoading.mockImplementation(() => true)

        const component = mount(<IdScheme />)
        const loading = component.find('[data-test="input-id-scheme-loading"]')

        expect(loading).toHaveLength(1)
        getSharedAttributesLoading.mockImplementation(() => false)
    })

    it('should render correctly when data is given', () => {
        getSharedAttributes.mockImplementation(() => [
            { displayName: 'Option 1', id: '1' },
            { displayName: 'Option 2', id: '2' },
        ])

        const component = mount(<IdScheme />)
        const input = component.find('[data-test="input-id-scheme"]')

        expect(input).toHaveLength(1)

        getSharedAttributes.mockImplementation(() => [])
    })
})
