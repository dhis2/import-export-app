import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { AtomicMode } from '../AtomicMode'

jest.mock('react-final-form')

describe('Input component - AtomicMode', () => {
    it('should render correctly', () => {
        const file = shallow(<AtomicMode />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
