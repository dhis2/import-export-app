import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { ObjectType } from '../ObjectType'

jest.mock('react-final-form')

describe('Input component - ObjectType', () => {
    it('should render correctly', () => {
        const file = shallow(<ObjectType />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
