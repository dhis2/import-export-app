import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { Icon, MetadataImportIcon } from '.'

const props = {
    dataTest: 'metadata-import-icon',
}

const r = (
    <Icon {...props}>
        <MetadataImportIcon />
    </Icon>
)

it('matches snapshot', () => {
    const { asFragment } = render(r)
    expect(asFragment()).toMatchSnapshot()
})

it('shows icon', () => {
    const { getByDataTest } = render(r)
    const icon = getByDataTest('metadata-import-icon')
    expect(icon).toContainHTML('</path>')
})
