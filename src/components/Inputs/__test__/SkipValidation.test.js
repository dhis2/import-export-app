import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { SkipValidation } from '../SkipValidation'

jest.mock('react-final-form')

describe('Input component - SkipValidation', () => {
    it('should render correctly', () => {
        const file = shallow(<SkipValidation />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
