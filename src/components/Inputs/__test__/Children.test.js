import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { Children } from '../Children'

jest.mock('react-final-form')

describe('Input component - Children', () => {
    it('should render correctly', () => {
        const file = shallow(<Children />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
