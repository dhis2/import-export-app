import React from 'react'
import renderer from 'react-test-renderer'
import { OrgUnitIdScheme } from '../OrgUnitIdScheme'

describe('Input component - OrgUnitIdScheme', () => {
    it('should render correctly', () => {
        const file = renderer.create(<OrgUnitIdScheme />).toJSON()

        expect(file).toMatchSnapshot()
    })
})
