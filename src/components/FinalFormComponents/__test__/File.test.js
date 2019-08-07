import React from 'react'
import { File } from '../File'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

jest.mock('react-final-form')

describe('Form component - File', () => {
    it('should render correctly', () => {
        const file = shallow(<File name="upload" />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
