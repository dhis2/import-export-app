import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { SkipAudit } from '../SkipAudit'

jest.mock('react-final-form')

describe('Input component - SkipAudit', () => {
    it('should render correctly', () => {
        const file = shallow(<SkipAudit />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
