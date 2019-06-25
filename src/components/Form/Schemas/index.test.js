import React from 'react'
import { shallow } from 'enzyme'
import { Loading } from '../../Loading'
import { DumbSchemas as Schemas } from './'

describe('Schemas', () => {
    it('renders a loading element when loading', () => {
        const wrapper = shallow(
            <Schemas name="schema" label="Schema" schemas={['schema']} />
        )

        expect(wrapper.containsAllMatchingElements([<Loading />])).toEqual(true)
    })
})
