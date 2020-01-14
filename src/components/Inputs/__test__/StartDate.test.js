import React from 'react'

import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { DateInput } from '../../FinalFormComponents/DateInput'
import { StartDate } from '../StartDate'

jest.mock('react-final-form')

describe('Input component - StartDate', () => {
    const dateToUse = new Date('2020')
    DateInput.defaultProps.initialValue = dateToUse

    it('should render correctly', () => {
        const file = shallow(<StartDate />)
        expect(toJson(file)).toMatchSnapshot()
    })
})
