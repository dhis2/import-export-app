import { useSelector } from 'react-redux'

jest.unmock('react-final-form')

import { Form } from 'react-final-form'
import { mount } from 'enzyme'
import React from 'react'
import toJson from 'enzyme-to-json'

import { Schemas } from '../Schemas'

jest.mock('react-redux', () => ({
    useSelector: jest.fn(selector => selector()),
    useDispatch: jest.fn(() => action => action),
}))

const createState = () => ({
    schemas: {
        loaded: true,
        loading: false,
        error: '',
        list: [],
    },
})

describe('Input component - Schemas', () => {
    let state

    useSelector.mockImplementation(selector => selector(state))

    beforeEach(() => {
        state = createState()
    })

    it('should render correctly', () => {
        state.schemas.list = [
            {
                name: 'dataElements',
                label: 'Data elements',
                group: 'dataElement',
            },
            {
                name: 'dataElementGroups',
                label: 'Data element groups',
                group: 'dataElement',
            },
        ]

        const component = mount(
            <Form onSubmit={() => null}>{() => <Schemas />}</Form>
        )

        expect(toJson(component)).toMatchSnapshot()
    })
})
