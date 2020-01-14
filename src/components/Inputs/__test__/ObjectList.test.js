jest.unmock('react-final-form')

import { Form } from 'react-final-form'
import { mount } from 'enzyme'
import React from 'react'

import { ObjectList } from '../ObjectList'
import { fetchObjects } from '../../../reducers/object/thunks'
import {
    getObjects,
    getObjectsLoaded,
    getObjectsLoading,
} from '../../../reducers/object/selectors'

jest.mock('react-redux', () => ({
    useSelector: jest.fn(selector => selector()),
    useDispatch: jest.fn(() => action => action),
}))

jest.mock('../../../reducers/object/thunks', () => ({
    fetchObjects: jest.fn(() =>
        Promise.resolve({
            type: 'FETCH_UNIQUE_DATA_ELEMENT_ATTRIBUTES',
            payload: { objects: [] },
        })
    ),
}))

jest.mock('../../../reducers/object/selectors', () => ({
    getObjects: jest.fn(() => []),
    getObjectsError: jest.fn(() => ''),
    getObjectsLoading: jest.fn(() => false),
}))

describe('Input component - ObjectList', () => {
    beforeEach(() => {
        getObjectsLoading.mockClear()
        fetchObjects.mockClear()
    })

    it('should show the loading state when objectType is not set', () => {
        const component = mount(
            <Form onSubmit={() => null}>{() => <ObjectList />}</Form>
        )
        const loading = component.find(
            '[data-test="input-object-list-loading"]'
        )

        expect(loading).toHaveLength(1)
    })

    it('should show the loading state when loading the objects', () => {
        getObjectsLoading.mockImplementation(() => true)

        const component = mount(
            <Form onSubmit={() => null} initialValues={{ objectType: 'foo' }}>
                {() => <ObjectList />}
            </Form>
        )
        const loading = component.find(
            '[data-test="input-object-list-loading"]'
        )

        expect(loading).toHaveLength(1)
        getObjectsLoading.mockImplementation(() => false)
    })

    it('should render correctly when data is given', () => {
        getObjects.mockImplementation(() => [{ value: 'foo', label: 'Foo' }])

        const component = mount(
            <Form onSubmit={() => null} initialValues={{ objectType: 'foo' }}>
                {() => <ObjectList />}
            </Form>
        )
        const input = component.find('[data-test="input-object-list"]')

        expect(input).toHaveLength(1)
        getObjects.mockImplementation(() => [])
    })

    it('should load the objects initially when objectType is present', () => {
        const component = mount(
            <Form onSubmit={() => null} initialValues={{ objectType: 'foo' }}>
                {({ form }) => <ObjectList />}
            </Form>
        )

        expect(fetchObjects).toHaveBeenCalledTimes(1)
    })
})
