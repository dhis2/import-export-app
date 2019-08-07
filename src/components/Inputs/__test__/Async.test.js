import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { Async } from '../Async'

jest.mock('react-final-form')

describe('Input component - Async', () => {
    it('should render correctly', () => {
        const file = shallow(<Async />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
