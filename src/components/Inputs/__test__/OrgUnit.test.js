import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { OrgUnit } from '../OrgUnit'

jest.mock('react-final-form')

describe('Input component - OrgUnit', () => {
    it('should render correctly', () => {
        const file = shallow(<OrgUnit />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
