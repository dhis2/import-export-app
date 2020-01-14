import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { ImportReportMode } from '../ImportReportMode'

jest.mock('react-final-form')

describe('Input component - ImportReportMode', () => {
    it('should render correctly', () => {
        const file = shallow(<ImportReportMode />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
