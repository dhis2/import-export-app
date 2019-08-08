import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { ImportMode } from '../ImportMode'

jest.mock('react-final-form')

describe('Input component - ImportMode', () => {
    it('should render correctly', () => {
        const file = shallow(<ImportMode />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
