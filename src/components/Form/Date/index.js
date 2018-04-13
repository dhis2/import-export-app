import React from 'react'
import cx from 'classnames'
import { FormControl, FormLabel, TextField } from 'material-ui'
import s from './styles.css'

export default class DateField extends React.Component {
  onChange = (evt, value) =>
    this.props.onChange(this.props.name, evt.target.value)

  render() {
    const { name, label, value, className } = this.props

    return (
      <FormControl classes={{ root: cx(s.formControl, className) }}>
        <FormLabel classes={{ root: s.formLabel }}>{label}</FormLabel>
        <TextField
          id={name}
          name={name}
          type="date"
          classes={{ root: s.dateField }}
          defaultValue={value}
          fullWidth={false}
          onChange={this.onChange}
        />
      </FormControl>
    )
  }
}
