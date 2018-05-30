import React from 'react'
import { HashRouter } from 'react-router-dom'
import { SidePanel } from '../'

const wrapper = mount(
  <HashRouter>
    <SidePanel />
  </HashRouter>
)

describe('SidePanel', () => {
  it ('Link to Metadata Import', () => {
    expect(wrapper.find('a[href="#/import/metadata"]').length).toEqual(1)
  })

  it ('Link to Data Import', () => {
    expect(wrapper.find('a[href="#/import/data"]').length).toEqual(1)
  })

  it ('Link to GML Import', () => {
    expect(wrapper.find('a[href="#/import/gml"]').length).toEqual(1)
  })

  it ('Link to Event Import', () => {
    expect(wrapper.find('a[href="#/import/event"]').length).toEqual(1)
  })

  it ('Link to Metadata Export', () => {
    expect(wrapper.find('a[href="#/export/metadata"]').length).toEqual(1)
  })

  it ('Link to Metadata Dependency Export', () => {
    expect(wrapper.find('a[href="#/export/metadata-dependency"]').length).toEqual(1)
  })

  it ('Link to Data Export', () => {
    expect(wrapper.find('a[href="#/export/data"]').length).toEqual(1)
  })

  it ('Link to Event Export', () => {
    expect(wrapper.find('a[href="#/export/event"]').length).toEqual(1)
  })
})
