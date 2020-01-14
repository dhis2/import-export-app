import React from 'react'

import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import { DataElementIdScheme } from '../DataElementIdScheme'
import { fetchUniqueDataElementAttributes } from '../../../reducers/attributes/thunks'
import {
    getDataElementAttributesLoaded,
    getDataElementAttributesLoading,
} from '../../../reducers/attributes/selectors'

jest.mock('react-redux', () => ({
    useSelector: jest.fn(selector => selector()),
    useDispatch: jest.fn(() => () => null),
}))

jest.mock('../../../reducers/attributes/thunks', () => ({
    fetchUniqueDataElementAttributes: jest.fn(() => ({
        type: 'FETCH_UNIQUE_DATA_ELEMENT_ATTRIBUTES',
    })),
}))

jest.mock('../../../reducers/attributes/selectors', () => ({
    getDataElementAttributes: jest.fn(() => []),
    getDataElementAttributesError: jest.fn(() => ''),
    getDataElementAttributesLoaded: jest.fn(() => true),
    getDataElementAttributesLoading: jest.fn(() => false),
}))

describe('Input component - DataElementIdScheme', () => {
    beforeEach(() => {
        getDataElementAttributesLoaded.mockClear()
        getDataElementAttributesLoading.mockClear()
        fetchUniqueDataElementAttributes.mockClear()
    })

    it('should show the loading state when data has not been loaded', () => {
        getDataElementAttributesLoaded.mockImplementation(() => false)

        const component = mount(<DataElementIdScheme />)
        const loading = component.find(
            '[data-test="input-data-element-id-scheme-loading"]'
        )

        expect(loading).toHaveLength(1)
        getDataElementAttributesLoaded.mockImplementation(() => true)
    })

    it('should show the loading state when data is being loaded', () => {
        getDataElementAttributesLoading.mockImplementation(() => true)

        const component = mount(<DataElementIdScheme />)
        const loading = component.find(
            '[data-test="input-data-element-id-scheme-loading"]'
        )

        expect(loading).toHaveLength(1)
        getDataElementAttributesLoading.mockImplementation(() => false)
    })

    it('should render correctly when data is given', () => {
        const component = mount(<DataElementIdScheme />)
        const loading = component.find(
            '[data-test="input-data-element-id-scheme"]'
        )

        expect(loading).toHaveLength(1)
    })

    it('should load the data element attributes when both loading and loaded is false', () => {
        getDataElementAttributesLoaded.mockImplementation(() => false)
        const component = mount(<DataElementIdScheme />)
        const loading = component.find(
            '[data-test="input-data-element-id-scheme"]'
        )

        expect(fetchUniqueDataElementAttributes).toHaveBeenCalledTimes(1)
        getDataElementAttributesLoaded.mockImplementation(() => true)
    })

    it('should not load the data element attributes when loading is true', () => {
        getDataElementAttributesLoading.mockImplementation(() => true)
        const component = mount(<DataElementIdScheme />)
        const loading = component.find(
            '[data-test="input-data-element-id-scheme"]'
        )

        expect(fetchUniqueDataElementAttributes).toHaveBeenCalledTimes(0)
        getDataElementAttributesLoading.mockImplementation(() => false)
    })

    it('should not load the data element attributes when loaded is true', () => {
        getDataElementAttributesLoaded.mockImplementation(() => true)
        const component = mount(<DataElementIdScheme />)
        const loading = component.find(
            '[data-test="input-data-element-id-scheme"]'
        )

        expect(fetchUniqueDataElementAttributes).toHaveBeenCalledTimes(0)
        getDataElementAttributesLoaded.mockImplementation(() => false)
    })
})
