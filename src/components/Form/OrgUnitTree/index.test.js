import React from 'react'
import { mount } from 'enzyme'
import OrgUnitTree from './'

describe('OrgUnitTree', () => {
    it('empty render', () => {
        const wrapper = mount(<OrgUnitTree name="schema" label="Schema" />)
        const tree = wrapper
            .find('[data-test="input-org-unit-tree"]')
            .children()
        expect(tree.html()).toEqual(null)
    })
})
