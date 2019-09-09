import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
    loadingAttributesError,
    loadingAttributesStart,
    setAttribute,
} from '../actions'

import {
    fetchUniqueDataElementAttributes,
    fetchUniqueOrgUnitAttributes,
    fetchUniqueCategoryAttributes,
} from '../thunks'

import {
    getUniqueDataElementAttributes,
    getUniqueOrganisationUnitAttributes,
    getUniqueCategoryAttributes,
} from '../../../helpers/api'

jest.mock('../../../helpers/api', () => ({
    getUniqueDataElementAttributes: jest.fn(() => Promise.resolve()),
    getUniqueOrganisationUnitAttributes: jest.fn(() => Promise.resolve()),
    getUniqueCategoryAttributes: jest.fn(() => Promise.resolve()),
}))

export const mockStore = configureMockStore([thunk])

describe('Thunks - Attributes', () => {
    const store = mockStore({})

    const hrIdentifier = {
        id: 'UKNKz1H10EE',
        displayName: 'HR identifier',
    }

    const keCode = {
        id: 'l1VmqIHKk6t',
        displayName: 'KE code',
    }

    afterEach(() => {
        store.clearActions()
        getUniqueDataElementAttributes.mockClear()
        getUniqueOrganisationUnitAttributes.mockClear()
        getUniqueCategoryAttributes.mockClear()
    })

    describe('fetchUniqueDataElementAttributes', () => {
        it('should dispatch a loading start action when loading the data element attributes', () => {
            const expectedActions = expect.arrayContaining([
                loadingAttributesStart('dataElement'),
            ])

            store.dispatch(fetchUniqueDataElementAttributes()).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })

        it('should dispatch a success action with the attributes when loading data element attributes successfully', () => {
            const dataElementAttributes = [hrIdentifier]

            const expectedActions = expect.arrayContaining([
                setAttribute('dataElement', dataElementAttributes),
            ])

            getUniqueDataElementAttributes.mockImplementationOnce(() =>
                Promise.resolve(dataElementAttributes)
            )

            store.dispatch(fetchUniqueDataElementAttributes()).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })

        it('should dispatch an error action with the error when loading data element attributes fails', () => {
            const error = new Error('Oops')

            const expectedActions = expect.arrayContaining([
                loadingAttributesError('dataElement', error.message),
            ])

            getUniqueDataElementAttributes.mockImplementationOnce(() =>
                Promise.reject(error)
            )

            store.dispatch(fetchUniqueDataElementAttributes()).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })
    })

    describe('fetchUniqueOrgUnitAttributes', () => {
        it('should dispatch a loading start action when loading the organisation unit attributes', () => {
            const expectedActions = expect.arrayContaining([
                loadingAttributesStart('organisationUnit'),
            ])

            store.dispatch(fetchUniqueOrgUnitAttributes()).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })

        it('should dispatch a success action with the attributes when loading organisation unit attributes successfully', () => {
            const organisationUnitAttributes = [hrIdentifier]

            const expectedActions = expect.arrayContaining([
                setAttribute('organisationUnit', organisationUnitAttributes),
            ])

            getUniqueOrganisationUnitAttributes.mockImplementationOnce(() =>
                Promise.resolve(organisationUnitAttributes)
            )

            store.dispatch(fetchUniqueOrgUnitAttributes()).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })

        it('should dispatch an error action with the error when loading organisation unit attributes fails', () => {
            const error = new Error('Oops')

            const expectedActions = expect.arrayContaining([
                loadingAttributesError('organisationUnit', error.message),
            ])

            getUniqueOrganisationUnitAttributes.mockImplementationOnce(() =>
                Promise.reject(error)
            )

            store.dispatch(fetchUniqueOrgUnitAttributes()).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })
    })

    describe('fetchUniqueCategoryAttributes', () => {
        it('should dispatch a loading start action when loading the category attributes', () => {
            const expectedActions = expect.arrayContaining([
                loadingAttributesStart('category'),
            ])

            store.dispatch(fetchUniqueCategoryAttributes()).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })

        it('should dispatch a success action with the attributes when loading category attributes successfully', () => {
            const categoryAttributes = [hrIdentifier]

            const expectedActions = expect.arrayContaining([
                setAttribute('category', categoryAttributes),
            ])

            getUniqueCategoryAttributes.mockImplementationOnce(() =>
                Promise.resolve(categoryAttributes)
            )

            store.dispatch(fetchUniqueCategoryAttributes()).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })

        it('should dispatch an error action with the error when loading category attributes fails', () => {
            const error = new Error('Oops')

            const expectedActions = expect.arrayContaining([
                loadingAttributesError('category', error.message),
            ])

            getUniqueCategoryAttributes.mockImplementationOnce(() =>
                Promise.reject(error)
            )

            store.dispatch(fetchUniqueCategoryAttributes()).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })
    })
})
