import React from 'react'
import { Tree } from 'components'
import { api } from 'services'
import { getInstance } from 'd2/lib/d2'

export default class OrgUnitTree extends React.Component {
  state = {
    list: [],
    selected: []
  }

  onIconClick = (value, open, list) => {
    this.setState({ list })

    if (open) {
      this.fetchNode(value)
    }
  }

  setSelected = (selected, isSelected, value) => {
    this.setState({ selected })
    this.props.updateSelected(selected, isSelected, value)
  }

  componentWillMount() {
    this.fetchRoot()
  }

  fetchRoot = async () => {
    try {
      const d2 = await getInstance()
      d2.models.organisationUnits
        .list({
          level: 1,
          paging: false,
          fields: 'id,path,displayName,children::isNotEmpty'
        })
        .then(root => {
          const list = root.toArray()
          this.setState({
            list: list.map(item => {
              const { path, displayName } = item
              return {
                open: false,
                value: path,
                label: displayName,
                children: []
              }
            })
          })
        })
    } catch (e) {
      console.log('OrgUnitTree root fetch failed')
    }
  }

  fetchNode = async path => {
    try {
      const params = []
      const id = path.substr(path.lastIndexOf('/') + 1)
      params.push('filter=' + encodeURIComponent(`id:in:[${id}]`))
      params.push('fields=' + encodeURIComponent(':all,displayName,path,children[id,displayName,path,children::isNotEmpty]'))
      params.push('paging=false')
      params.push('format=json')

      const { data: { organisationUnits } } = await api.get(`organisationUnits?${params.join('&')}`)
      const { children } = organisationUnits[0]

      const items = children.map(({ id, path, displayName, children }) => ({
        open: false,
        value: path,
        label: displayName,
        children: children ? [] : null
      }))
      items.sort((a, b) => a.label.localeCompare(b.label))

      const { list } = this.state
      this.setChildren(path, items, list)
      this.setState({
        list: [...list]
      })
    } catch (e) {
      console.log('OrgUnitTree root fetch failed')
      console.log(e)
    }
  }

  setChildren(path, children, list) {
    for (let i = 0; i < list.length; i += 1) {
      if (list[i]['value'] === path) {
        list[i]['children'] = children.slice(0)
        return
      }

      if (list[i]['children'].length > 0) {
        this.setChildren(path, children, list[i]['children'])
      }
    }
  }

  render() {
    const { multiple, selectable } = this.props
    const { list, selected } = this.state
    return (
      <Tree
        multiple={typeof multiple !== 'undefined' ? multiple : false}
        selectable={typeof selectable !== 'undefined' ? selectable : true}
        list={list}
        selected={selected}
        onIconClick={this.onIconClick}
        setSelected={this.setSelected}
      />
    )
  }
}
