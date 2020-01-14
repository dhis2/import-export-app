import React from 'react'

import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { DateInput } from '../../FinalFormComponents/DateInput'
import { EndDate } from '../EndDate'

jest.mock('react-final-form')

describe('Input component - EndDate', () => {
    const dateToUse = new Date('2020')
    DateInput.defaultProps.initialValue = dateToUse

    it('should render correctly', () => {
        const file = shallow(<EndDate />)
        expect(toJson(file)).toMatchSnapshot()
    })
})
