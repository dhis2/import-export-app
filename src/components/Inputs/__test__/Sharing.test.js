import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { Sharing } from '../Sharing'

jest.mock('react-final-form')

describe('Input component - Sharing', () => {
    it('should render correctly', () => {
        const file = shallow(<Sharing />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
