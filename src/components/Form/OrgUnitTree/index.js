import React from 'react'

import { Tree } from '../../Tree'
import { isProduction } from '../../../helpers/env'
import { getOrgUnitRoot, getOrgUnitsForPath } from '../../../helpers/api'

export default class OrgUnitTree extends React.Component {
    state = {
        list: [],
        selected: this.props.selected || [],
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

    componentDidMount() {
        this.fetchRoot()
    }

    componentWillReceiveProps(newProps) {
        this.setState({ selected: newProps.selected })
    }

    fetchRoot = async () => {
        try {
            getOrgUnitRoot().then(root => {
                const list = root.toArray()
                this.setState({
                    list: list.map(item => {
                        const { path, displayName } = item
                        return {
                            open: false,
                            value: path,
                            label: displayName,
                            children: [],
                        }
                    }),
                })
            })
        } catch (e) {
            !isProduction && console.log('OrgUnitTree root fetch failed')
        }
    }

    fetchNode = async path => {
        try {
            const children = await getOrgUnitsForPath(path)
            const items = children.map(({ path, displayName, children }) => ({
                open: false,
                value: path,
                label: displayName,
                children: children ? [] : null,
            }))
            items.sort((a, b) => a.label.localeCompare(b.label))

            const { list } = this.state
            this.setChildren(path, items, list)
            this.setState({
                list: [...list],
            })
        } catch (e) {
            !isProduction && console.log('OrgUnitTree fetchNode failed')
            !isProduction && console.log(e)
        }
    }

    setChildren(path, children, list) {
        if (!Array.isArray(list)) {
            return
        }

        for (let i = 0; i < list.length; i += 1) {
            if (list[i]['value'] === path) {
                list[i]['children'] = children.slice(0)
                return
            }

            if (list[i]['children'] && list[i]['children'].length > 0) {
                this.setChildren(path, children, list[i]['children'])
            }
        }
    }

    render() {
        const { multiple, selectable } = this.props
        const { list, selected } = this.state
        return (
            <div data-test="input-org-unit-tree">
                <Tree
                    multiple={
                        typeof multiple !== 'undefined' ? multiple : false
                    }
                    selectable={
                        typeof selectable !== 'undefined' ? selectable : true
                    }
                    list={list}
                    selected={selected}
                    onIconClick={this.onIconClick}
                    setSelected={this.setSelected}
                />
            </div>
        )
    }
}
