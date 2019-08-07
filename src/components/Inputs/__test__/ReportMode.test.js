import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { ReportMode } from '../ReportMode'

jest.mock('react-final-form')

describe('Input component - ReportMode', () => {
    it('should render correctly', () => {
        const file = shallow(<ReportMode />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
