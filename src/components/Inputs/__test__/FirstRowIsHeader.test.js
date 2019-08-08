import React from 'react'
import toJson from 'enzyme-to-json'
import { mount } from 'enzyme'
import { FirstRowIsHeader } from '../FirstRowIsHeader'

jest.mock('react-final-form')

describe('Input component - FirstRowIsHeader', () => {
    it('should render correctly', () => {
        const file = mount(<FirstRowIsHeader />)

        expect(toJson(file)).toMatchSnapshot()
    })
})
