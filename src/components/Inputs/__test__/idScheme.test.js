import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { IdScheme } from '../idScheme'

jest.mock('react-final-form')

describe('Input component - IdScheme', () => {
    it('should render correctly', () => {
        const file = shallow(<IdScheme />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
