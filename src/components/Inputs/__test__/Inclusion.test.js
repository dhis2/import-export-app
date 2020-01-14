import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { Inclusion } from '../Inclusion'

jest.mock('react-final-form')

describe('Input component - Inclusion', () => {
    it('should render correctly', () => {
        const file = shallow(<Inclusion />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
