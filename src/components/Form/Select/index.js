import React from 'react'
import { SelectField as Select, MenuItem } from 'material-ui'
import { FormControl, FormLabel } from 'components/material-ui'
import s from './styles.css'

export default class SelectField extends React.Component {
  onChange = evt => this.props.onChange(this.props.name, evt.target.value)

  render() {
    const { name, label, values, selected } = this.props

    return (
      <FormControl classes={{ root: s.formControl }}>
        <FormLabel classes={{ root: s.formLabel }}>{label}</FormLabel>
        <Select
          autoWidth={true}
          value={selected}
          onChange={this.onChange}
          classes={{
            root: s.select
          }}
          fullWidth={false}
          disableUnderline={true}
        >
          {values.map(v => (
            <MenuItem key={`mi-${name}-${v.value}`} value={v.value}>
              {v.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
}
