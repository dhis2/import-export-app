import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { FormLabel } from '../material-ui'
import { TextField, MenuItem } from 'material-ui'
import CheckedIcon from 'material-ui/svg-icons/toggle/check-box'
import UnCheckedIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import s from './styles.css'

const styles = {
    menuItem: {
        style: {
            padding: 0,
            minHeight: 24,
            lineHeight: '24px',
        },
        innerDivStyle: {
            padding: 0,
        },
    },
}

const Action = ({ label, children, onClick }) => (
    <div className={s.action} onClick={onClick}>
        {children}
        <div className={s.actionLabel}>{label}</div>
    </div>
)

export default class DataSetPicker extends React.Component {
    state = {
        filter: '',
    }

    onUpdateFilter = (evt, filter) => this.setState({ filter })

    onChange = value => {
        let list = this.props.selected
        if (list.includes(value)) {
            list = list.filter(v => v !== value)
        } else {
            list.push(value)
        }

        this.props.onChange(this.props.name, list)
    }

    filter() {
        return (
            <div className={s.filter}>
                <TextField
                    fullWidth={true}
                    hintText={i18n.t('filter data sets by name')}
                    value={this.state.filter}
                    onChange={this.onUpdateFilter}
                />
            </div>
        )
    }

    onSelectAll = () =>
        this.props.onChange(
            this.props.name,
            this.props.value.map(({ value }) => value)
        )
    onClearAll = () => this.props.onChange(this.props.name, [])

    actions() {
        return (
            <div className={s.actions}>
                <Action onClick={this.onSelectAll} label={i18n.t('Select All')}>
                    <CheckedIcon />
                </Action>
                <Action onClick={this.onClearAll} label={i18n.t('Clear All')}>
                    <UnCheckedIcon />
                </Action>
            </div>
        )
    }

    header() {
        return (
            <div className={s.header}>
                <FormLabel className={s.formLabel}>
                    {i18n.t('Data sets')}
                </FormLabel>
            </div>
        )
    }

    values() {
        const { value } = this.props
        const filter = this.state.filter.toLowerCase()
        return filter.length === 0
            ? value
            : value.filter(({ label }) => label.toLowerCase().includes(filter))
    }

    leftIcon(value) {
        return this.props.selected.includes(value) ? (
            <CheckedIcon />
        ) : (
            <UnCheckedIcon />
        )
    }

    contents() {
        let values = this.values()
        return (
            <div className={s.body}>
                {values.map(({ value, label }) => (
                    <MenuItem
                        key={`dateSetPicker-mi-${value}`}
                        {...styles.menuItem}
                        value={value}
                        primaryText={label}
                        insetChildren={true}
                        leftIcon={this.leftIcon(value)}
                        onClick={() => this.onChange(value)}
                    />
                ))}
            </div>
        )
    }

    render() {
        return (
            <div className={s.container}>
                {this.header()}
                {this.filter()}
                {this.actions()}
                {this.contents()}
            </div>
        )
    }
}
