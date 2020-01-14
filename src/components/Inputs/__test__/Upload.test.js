import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { Upload } from '../Upload'

jest.mock('react-final-form')

describe('Input component - Upload', () => {
    it('should render correctly', () => {
        const file = shallow(<Upload />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
