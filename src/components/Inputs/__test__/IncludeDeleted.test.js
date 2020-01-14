import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { IncludeDeleted } from '../IncludeDeleted'

jest.mock('react-final-form')

describe('Input component - IncludeDeleted', () => {
    it('should render correctly', () => {
        const file = shallow(<IncludeDeleted />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
