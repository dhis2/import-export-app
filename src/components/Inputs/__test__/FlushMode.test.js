import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { FlushMode } from '../FlushMode'

jest.mock('react-final-form')

describe('Input component - FlushMode', () => {
    it('should render correctly', () => {
        const file = shallow(<FlushMode />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
