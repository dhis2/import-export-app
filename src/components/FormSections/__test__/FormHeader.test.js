import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { FormHeader } from '../FormHeader'

describe('Input component - FormHeader', () => {
    it('should render correctly', () => {
        const file = shallow(
            <FormHeader>
                <span>Test</span>
                Foobar
            </FormHeader>
        )

        expect(toJson(file)).toMatchSnapshot()
    })
})
