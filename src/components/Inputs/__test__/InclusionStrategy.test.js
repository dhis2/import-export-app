import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { InclusionStrategy } from '../InclusionStrategy'

jest.mock('react-final-form')

describe('Input component - InclusionStrategy', () => {
    it('should render correctly', () => {
        const file = shallow(<InclusionStrategy />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
