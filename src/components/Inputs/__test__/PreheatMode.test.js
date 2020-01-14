import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { PreheatMode } from '../PreheatMode'

jest.mock('react-final-form')

describe('Input component - PreheatMode', () => {
    it('should render correctly', () => {
        const file = shallow(<PreheatMode />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
