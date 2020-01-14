import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { ImportStrategy } from '../ImportStrategy'

jest.mock('react-final-form')

describe('Input component - ImportStrategy', () => {
    it('should render correctly', () => {
        const file = shallow(<ImportStrategy />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
