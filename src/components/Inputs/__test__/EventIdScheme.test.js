import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { EventIdScheme } from '../EventIdScheme'

jest.mock('react-final-form')

describe('Input component - EventIdScheme', () => {
    it('should render correctly', () => {
        const file = shallow(<EventIdScheme />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
