import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { SkipSharing } from '../SkipSharing'

jest.mock('react-final-form')

describe('Input component - SkipSharing', () => {
    it('should render correctly', () => {
        const file = shallow(<SkipSharing />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
