import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { Compression } from '../Compression'

jest.mock('react-final-form')

describe('Input component - Compression', () => {
    it('should render correctly', () => {
        const file = shallow(<Compression />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
