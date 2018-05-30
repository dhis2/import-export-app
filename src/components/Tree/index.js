import React from 'react'
import cx from 'classnames'
import s from './styles.css'

function Node({
  label,
  value,
  open,
  depth,
  isSelected,
  children,
  onClick,
  onIconClick
}) {
  const hasChildren = children && children.length > 0
  return (
    <div
      className={s.node}
      style={{
        marginLeft: depth * 16
      }}
    >
      <div
        className={cx(s.label, {
          [s.selected]: isSelected
        })}
        onClick={() => onClick(value)}
      >
        {hasChildren ? (
          <div
            className={s.icon}
            onClick={evt => onIconClick(evt, !open, value)}
          >
            {open ? '\u2212' : '\u002B'}
          </div>
        ) : (
          <div className={s.icon} />
        )}
        <div className={s.text}>{label}</div>
      </div>
      {open && children && <div className={s.children}>{children}</div>}
    </div>
  )
}

export class Tree extends React.Component {
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
    selected: ['/item-b']
  }

  updateState(list, open, value) {
    let found = false
    for (let i = 0; i < list.length; i += 1) {
      if (list[i]['value'] === value) {
        list[i]['open'] = open
        found = true
      }

      if (!found && typeof list[i]['children'] !== 'undefined') {
        this.updateState(list[i]['children'], open, value)
      }
    }

    return list
  }

  onIconClick = (evt, open, value) => {
    evt.stopPropagation()
    const list = this.updateState(this.state.list, open, value)
    this.setState({
      list: [...list]
    })
    if (open) {
      // this.props.onOpen(value)
    }
  }

  onClick = value => {
    const { multiple, selectable } = this.props
    if (!selectable) {
      return
    }

    let { selected } = this.state
    if (typeof multiple === 'undefined' || !multiple) {
      this.setState({
        selected: selected.includes(value) ? [] : [value]
      })
      return
    }

    if (selected.includes(value)) {
      selected = selected.filter(v => v !== value)
    } else {
      selected = selected.slice(0)
      selected.push(value)
    }
    this.setState({ selected })
  }

  node(list, depth = 0) {
    return list.map(({ open, label, value, children }) => {
      return (
        <Node
          key={`node-${value}`}
          depth={depth}
          open={open}
          label={label}
          value={value}
          onClick={this.onClick}
          onIconClick={this.onIconClick}
          isSelected={this.state.selected.includes(value)}
        >
          {children ? this.node(children, depth + 1) : null}
        </Node>
      )
    })
  }

  view() {
    return this.node(this.state.list)
  }

  render() {
    if (this.state.list.length === 0) {
      return null
    }

    return <div className={s.container}>{this.view()}</div>
  }
}
