import React from 'react'
import cx from 'classnames'
import s from './styles.module.css'

function NodeIcon({ hasChildren, open, value, onClick }) {
    if (hasChildren) {
        return (
            <div className={s.icon} onClick={evt => onClick(evt, !open, value)}>
                {open ? '\u2212' : '\u002B'}
            </div>
        )
    }

    return <div className={s.icon} />
}

function NodeSpacer({ depth, hasChildren }) {
    let minWidth = depth * 20
    if (!hasChildren) {
        minWidth += 7
    }

    return <div style={{ minWidth }} />
}

function NodeLabel({ label }) {
    return <div className={s.text}>{label}</div>
}

function Node({
    label,
    value,
    open,
    depth,
    isSelected,
    children,
    onClick,
    onIconClick,
}) {
    const hasChildren = children && Array.isArray(children)
    return (
        <div>
            <div
                className={cx(s.label, {
                    [s.selected]: isSelected,
                })}
                onClick={() => onClick(value)}
            >
                <NodeSpacer depth={depth} />
                <NodeIcon
                    hasChildren={hasChildren}
                    open={open}
                    value={value}
                    onClick={onIconClick}
                />
                <NodeLabel label={label} />
            </div>
            {open && children && <div className={s.children}>{children}</div>}
        </div>
    )
}

export class Tree extends React.Component {
    updateState(list, open, value) {
        if (!Array.isArray(list)) {
            return
        }

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
        const list = this.updateState(this.props.list, open, value)
        this.props.onIconClick(value, open, [...list])
    }

    onClick = value => {
        const { multiple, selectable } = this.props
        if (!selectable) {
            return
        }

        let { selected } = this.props
        const isSelected = selected.includes(value)
        if (typeof multiple === 'undefined' || !multiple) {
            this.props.setSelected(
                isSelected ? [] : [value],
                !isSelected,
                value
            )
            return
        }

        if (isSelected) {
            selected = selected.filter(v => v !== value)
        } else {
            selected = selected.slice(0)
            selected.push(value)
        }

        this.props.setSelected(selected, !isSelected, value)
    }

    node(list, depth = 0) {
        if (!Array.isArray(list)) {
            return null
        }

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
                    isSelected={this.props.selected.includes(value)}
                >
                    {children ? this.node(children, depth + 1) : null}
                </Node>
            )
        })
    }

    view() {
        return this.node(this.props.list)
    }

    render() {
        if (this.props.list.length === 0) {
            return null
        }

        return <div className={s.container}>{this.view()}</div>
    }
}
