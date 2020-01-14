import React from 'react'

import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import { OrgUnitIdScheme } from '../OrgUnitIdScheme'
import { fetchUniqueOrgUnitAttributes } from '../../../reducers/attributes/thunks'
import {
    getOrgUnitAttributesLoaded,
    getOrgUnitAttributesLoading,
} from '../../../reducers/attributes/selectors'

jest.mock('react-redux', () => ({
    useSelector: jest.fn(selector => selector()),
    useDispatch: jest.fn(() => () => null),
}))

jest.mock('../../../reducers/attributes/thunks', () => ({
    fetchUniqueOrgUnitAttributes: jest.fn(() => ({
        type: 'FETCH_UNIQUE_DATA_ELEMENT_ATTRIBUTES',
    })),
}))

jest.mock('../../../reducers/attributes/selectors', () => ({
    getOrgUnitAttributes: jest.fn(() => []),
    getOrgUnitAttributesError: jest.fn(() => ''),
    getOrgUnitAttributesLoaded: jest.fn(() => true),
    getOrgUnitAttributesLoading: jest.fn(() => false),
}))

describe('Input component - OrgUnitIdScheme', () => {
    beforeEach(() => {
        getOrgUnitAttributesLoaded.mockClear()
        getOrgUnitAttributesLoading.mockClear()
        fetchUniqueOrgUnitAttributes.mockClear()
    })

    it('should show the loading state when data has not been loaded', () => {
        getOrgUnitAttributesLoaded.mockImplementation(() => false)

        const component = mount(<OrgUnitIdScheme />)
        const loading = component.find(
            '[data-test="input-org-unit-id-scheme-loading"]'
        )

        expect(loading).toHaveLength(1)
        getOrgUnitAttributesLoaded.mockImplementation(() => true)
    })

    it('should show the loading state when data is being loaded', () => {
        getOrgUnitAttributesLoading.mockImplementation(() => true)

        const component = mount(<OrgUnitIdScheme />)
        const loading = component.find(
            '[data-test="input-org-unit-id-scheme-loading"]'
        )

        expect(loading).toHaveLength(1)
        getOrgUnitAttributesLoading.mockImplementation(() => false)
    })

    it('should render correctly when data is given', () => {
        const component = mount(<OrgUnitIdScheme />)
        const loading = component.find('[data-test="input-org-unit-id-scheme"]')

        expect(loading).toHaveLength(1)
    })

    it('should load the data element attributes when both loading and loaded is false', () => {
        getOrgUnitAttributesLoaded.mockImplementation(() => false)
        const component = mount(<OrgUnitIdScheme />)
        const loading = component.find('[data-test="input-org-unit-id-scheme"]')

        expect(fetchUniqueOrgUnitAttributes).toHaveBeenCalledTimes(1)
        getOrgUnitAttributesLoaded.mockImplementation(() => true)
    })

    it('should not load the data element attributes when loading is true', () => {
        getOrgUnitAttributesLoading.mockImplementation(() => true)
        const component = mount(<OrgUnitIdScheme />)
        const loading = component.find('[data-test="input-org-unit-id-scheme"]')

        expect(fetchUniqueOrgUnitAttributes).toHaveBeenCalledTimes(0)
        getOrgUnitAttributesLoading.mockImplementation(() => false)
    })

    it('should not load the data element attributes when loaded is true', () => {
        getOrgUnitAttributesLoaded.mockImplementation(() => true)
        const component = mount(<OrgUnitIdScheme />)
        const loading = component.find('[data-test="input-org-unit-id-scheme"]')

        expect(fetchUniqueOrgUnitAttributes).toHaveBeenCalledTimes(0)
        getOrgUnitAttributesLoaded.mockImplementation(() => false)
    })
})
