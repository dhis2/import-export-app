import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { SkipExistingCheck } from '../SkipExistingCheck'

jest.mock('react-final-form')

describe('Input component - SkipExistingCheck', () => {
    it('should render correctly', () => {
        const file = shallow(<SkipExistingCheck />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
