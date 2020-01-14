import React from 'react'

import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import { Programs } from '../Programs'
import { fetchPrograms } from '../../../reducers/program/thunks'
import {
    getPrograms,
    getProgramsLoaded,
    getProgramsLoading,
} from '../../../reducers/program/selectors'

jest.mock('react-redux', () => ({
    useSelector: jest.fn(selector => selector()),
    useDispatch: jest.fn(() => action => action),
}))

jest.mock('../../../reducers/program/thunks', () => ({
    fetchPrograms: jest.fn(() =>
        Promise.resolve({
            type: 'FETCH_UNIQUE_DATA_ELEMENT_ATTRIBUTES',
            payload: { programs: [{ value: 'foo' }] },
        })
    ),
}))

jest.mock('../../../reducers/program/selectors', () => ({
    getPrograms: jest.fn(() => []),
    getProgramsError: jest.fn(() => ''),
    getProgramsLoaded: jest.fn(() => true),
    getProgramsLoading: jest.fn(() => false),
}))

describe('Input component - Programs', () => {
    beforeEach(() => {
        getProgramsLoaded.mockClear()
        getProgramsLoading.mockClear()
        fetchPrograms.mockClear()
    })

    it('should show the loading state when data has not been loaded', () => {
        getProgramsLoaded.mockImplementation(() => false)

        const component = mount(<Programs />)
        const loading = component.find('[data-test="input-programs-loading"]')

        expect(loading).toHaveLength(1)
        getProgramsLoaded.mockImplementation(() => true)
    })

    it('should show the loading state when data is being loaded', () => {
        getProgramsLoading.mockImplementation(() => true)

        const component = mount(<Programs />)
        const loading = component.find('[data-test="input-programs-loading"]')

        expect(loading).toHaveLength(1)
        getProgramsLoading.mockImplementation(() => false)
    })

    it('should render correctly when data is given', () => {
        getPrograms.mockImplementationOnce(() => [
            { value: 'foo', label: 'Foo' },
        ])
        const component = mount(<Programs />)
        const loading = component.find('[data-test="input-programs"]')

        expect(loading).toHaveLength(1)
    })

    it('should load the programs when both loading and loaded is false', () => {
        getProgramsLoaded.mockImplementation(() => false)
        const component = mount(<Programs />)
        const loading = component.find('[data-test="input-programs"]')

        expect(fetchPrograms).toHaveBeenCalledTimes(1)
        getProgramsLoaded.mockImplementation(() => true)
    })

    it('should not load the programs when loading is true', () => {
        getProgramsLoading.mockImplementation(() => true)
        const component = mount(<Programs />)
        const loading = component.find('[data-test="input-programs"]')

        expect(fetchPrograms).toHaveBeenCalledTimes(0)
        getProgramsLoading.mockImplementation(() => false)
    })

    it('should not load the programs when loaded is true', () => {
        getProgramsLoaded.mockImplementation(() => true)
        const component = mount(<Programs />)
        const loading = component.find('[data-test="input-programs"]')

        expect(fetchPrograms).toHaveBeenCalledTimes(0)
        getProgramsLoaded.mockImplementation(() => false)
    })
})
