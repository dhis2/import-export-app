import React from 'react'
import { mount } from 'enzyme'
import OrgUnitTree from '../'

describe('OrgUnitTree', () => {
    it('empty render', () => {
        const wrapper = mount(<OrgUnitTree name="schema" label="Schema" />)
        expect(wrapper.html()).toEqual(null)
    })
})
