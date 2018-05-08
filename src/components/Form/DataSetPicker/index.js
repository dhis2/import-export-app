import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { FormLabel } from 'components/material-ui'
import { TextField, MenuItem } from 'material-ui'
import CheckIcon from 'material-ui/svg-icons/navigation/check'

import s from './styles.css'

const styles = {
  menuItem: {
    style: {
      padding: 0,
      minHeight: 24,
      lineHeight: '24px'
    },
    innerDivStyle: {
      padding: 0
    }
  }
}

export default class DataSetPicker extends React.Component {
  state = {
    filter: ''
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

  render() {
    const { value, selected } = this.props
    const filter = this.state.filter.toLowerCase()
    let values =
      filter.length === 0
        ? value
        : value.filter(({ label }) => label.toLowerCase().includes(filter))

    return (
      <div className={s.container}>
        <div className={s.header}>
          <FormLabel className={s.formLabel}>{i18n.t('Data sets')}</FormLabel>
        </div>
        {this.filter()}
        <div className={s.body}>
          {values.map(({ value, label }) => (
            <MenuItem
              {...styles.menuItem}
              key={`dateSetPicker-mi-${value}`}
              value={value}
              primaryText={label}
              insetChildren={true}
              onClick={() => this.onChange(value)}
              leftIcon={selected.includes(value) ? <CheckIcon /> : null}
            />
          ))}
        </div>
      </div>
    )
  }
}
