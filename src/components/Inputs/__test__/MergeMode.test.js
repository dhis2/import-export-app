import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { MergeMode } from '../MergeMode'

jest.mock('react-final-form')

describe('Input component - MergeMode', () => {
    it('should render correctly', () => {
        const file = shallow(<MergeMode />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
