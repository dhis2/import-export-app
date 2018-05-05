import React from 'react'
import cx from 'classnames'
import { RadioButtonGroup, RadioButton } from 'material-ui'
import { FormLabel, FormControl } from 'components/material-ui'
import s from './styles.css'

export default class RadioField extends React.Component {
  onChange = (evt, value) => this.props.onChange(this.props.name, value)

  render() {
    const { name, label, values, selected, className } = this.props

    return (
      <FormControl classes={{ root: cx(s.formControl, className) }}>
        <FormLabel classes={{ root: s.formLabel }}>{label}</FormLabel>
        <RadioButtonGroup
          name={`radioGroup-${name}`}
          classes={{ root: s.radioGroup }}
          value={selected}
          onChange={this.onChange}
        >
          {values.map(v => (
            <RadioButton
              key={`radio-${v.value}`}
              value={v.value}
              label={v.label}
            />
          ))}
        </RadioButtonGroup>
      </FormControl>
    )
  }
}
