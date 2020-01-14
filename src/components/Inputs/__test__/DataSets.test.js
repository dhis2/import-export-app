import React from 'react'

import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import { DataSets } from '../DataSets'
import {
    getDataSetsError,
    getDataSetsLoaded,
    getDataSetsLoading,
} from '../../../reducers/dataSets/selectors'
import { loadDataSets } from '../../../reducers/dataSets/thunks'

jest.mock('react-redux', () => ({
    useSelector: jest.fn(selector => selector()),
    useDispatch: jest.fn(() => () => null),
}))

jest.mock('../../../reducers/dataSets/thunks', () => ({
    loadDataSets: jest.fn(() => ({
        type: 'FETCH_UNIQUE_DATA_ELEMENT_ATTRIBUTES',
    })),
}))

jest.mock('../../../reducers/dataSets/selectors', () => ({
    getFilteredDataSets: jest.fn(() => []),
    getDataSetsError: jest.fn(() => ''),
    getDataSetsFilter: jest.fn(() => ''),
    getDataSetsLoaded: jest.fn(() => true),
    getDataSetsLoading: jest.fn(() => false),
}))

describe('Input component - DataSets', () => {
    beforeEach(() => {
        getDataSetsLoaded.mockClear()
        getDataSetsLoading.mockClear()
        loadDataSets.mockClear()
    })

    it('should show the loading state when data has not been loaded', () => {
        getDataSetsLoaded.mockImplementation(() => false)

        const component = mount(<DataSets />)
        const loading = component.find('[data-test="input-data-sets-loading"]')

        expect(loading).toHaveLength(1)
        getDataSetsLoaded.mockImplementation(() => true)
    })

    it('should show the loading state when data is being loaded', () => {
        getDataSetsLoading.mockImplementation(() => true)

        const component = mount(<DataSets />)
        const loading = component.find('[data-test="input-data-sets-loading"]')

        expect(loading).toHaveLength(1)
        getDataSetsLoading.mockImplementation(() => false)
    })

    it('should show the error state when loading the data was not successful', () => {
        getDataSetsError.mockImplementation(() => 'Error')

        const component = mount(<DataSets />)
        const loading = component.find('[data-test="input-data-sets-error"]')

        expect(loading).toHaveLength(1)
        getDataSetsError.mockImplementation(() => '')
    })

    it('should render correctly when data is given', () => {
        const component = mount(<DataSets />)
        const loading = component.find('[data-test="input-data-sets"]')

        expect(loading).toHaveLength(1)
    })

    it('should load the data sets when both loading and loaded is false', () => {
        getDataSetsLoaded.mockImplementation(() => false)

        const component = mount(<DataSets />)
        expect(loadDataSets).toHaveBeenCalledTimes(1)

        getDataSetsLoaded.mockImplementation(() => true)
    })

    it('should not load the data sets when loading is true', () => {
        getDataSetsLoading.mockImplementation(() => true)

        const component = mount(<DataSets />)
        expect(loadDataSets).toHaveBeenCalledTimes(0)

        getDataSetsLoading.mockImplementation(() => false)
    })

    it('should not load the data sets when loaded is true', () => {
        getDataSetsLoaded.mockImplementation(() => true)

        const component = mount(<DataSets />)
        expect(loadDataSets).toHaveBeenCalledTimes(0)

        getDataSetsLoaded.mockImplementation(() => false)
    })

    it('should not load the data sets when an error happened previously', () => {
        getDataSetsError.mockImplementation(() => 'Error')

        const component = mount(<DataSets />)
        expect(loadDataSets).toHaveBeenCalledTimes(0)

        getDataSetsError.mockImplementation(() => '')
    })
})
