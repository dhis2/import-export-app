import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { FormFooter } from '../FormFooter'

describe('Input component - FormFooter', () => {
    it('should render correctly', () => {
        const file = shallow(<FormFooter icon={<span />} label="Form head" />)
        expect(toJson(file)).toMatchSnapshot()
    })
})
