import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { DataElementIdScheme } from '../DataElementIdScheme'

jest.mock('react-final-form')

describe('Input component - DataElementIdScheme', () => {
    it('should render correctly', () => {
        const file = shallow(<DataElementIdScheme />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
