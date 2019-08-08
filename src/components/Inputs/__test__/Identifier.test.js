import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { Identifier } from '../Identifier'

jest.mock('react-final-form')

describe('Input component - Identifier', () => {
    it('should render correctly', () => {
        const file = shallow(<Identifier />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
