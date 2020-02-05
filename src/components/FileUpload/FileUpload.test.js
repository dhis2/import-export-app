import React from 'react'
import { render } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import { FileUpload } from '.'

const props = {
    dataTest: 'file-upload',
    name: 'file',
    setFile: () => 1,
}

it('matches snapshot', () => {
    const { asFragment } = render(<FileUpload {...props} />)
    expect(asFragment()).toMatchSnapshot()
})

it('shows instructions', () => {
    const { getByDataTest } = render(<FileUpload {...props} />)
    const button = getByDataTest('file-upload-fileinput')
    expect(button).toHaveTextContent('Choose a file to upload')
})

it('shows filename', () => {
    const file = new File([''], 'testfile.json', { type: 'application/json' })
    const { getByDataTest } = render(<FileUpload {...props} file={file} />)
    const button = getByDataTest('file-upload-fileinput')
    expect(button).toHaveTextContent('testfile.json')
})
