import React from 'react'
import { Tree } from 'components'
// import { OrgUnitTree } from '@dhis2/d2-ui-org-unit-tree'

export default class OrgUnits extends React.Component {
  state = {
    list: [
      {
        open: false,
        label: 'Item A',
        value: '/item-a',
        children: [
          {
            open: false,
            label: 'Item B',
            value: '/item-b',
            children: [
              {
                open: false,
                label: 'Item D',
                value: '/item-d'
              }
            ]
          },
          {
            open: false,
            label: 'Item C',
            value: 'item-c'
          }
        ]
      },
      {
        open: false,
        label: 'Item 1',
        value: '/item-1',
        children: [
          {
            open: false,
            label: 'Item 2',
            value: '/item-2',
            children: [
              {
                open: false,
                label: 'Item 3',
                value: '/item-3'
              }
            ]
          },
          {
            open: false,
            label: 'Item 5',
            value: 'item-5'
          }
        ]
      }
    ],
    selected: []
  }

  onIconClick = (value, open, list) => {
    this.setState({ list })
    // TODO if open: true, fetch the list of new items if not already in list
  }

  setSelected = selected => this.setState({ selected })

  render() {
    const { multiple, selectable } = this.props
    const { list, selected } = this.state
    return (
      <Tree
        multiple={multiple ? multiple : false}
        selectable={selectable ? selectable : true}
        list={list}
        selected={selected}
        onIconClick={this.onIconClick}
        setSelected={this.setSelected}
      />
    )
  }
}