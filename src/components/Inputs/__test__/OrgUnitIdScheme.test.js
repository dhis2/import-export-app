import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { OrgUnitIdScheme } from '../OrgUnitIdScheme'

jest.mock('react-final-form')

describe('Input component - OrgUnitIdScheme', () => {
    it('should render correctly', () => {
        const file = shallow(<OrgUnitIdScheme />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
