import React from 'react'
import renderer from 'react-test-renderer'
import { OrgUnitIdScheme } from '../OrgUnitIdScheme'

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

describe('Input component - OrgUnitIdScheme', () => {
    it('should render correctly', () => {
        const file = renderer.create(<OrgUnitIdScheme />).toJSON()

        expect(file).toMatchSnapshot()
    })
})
