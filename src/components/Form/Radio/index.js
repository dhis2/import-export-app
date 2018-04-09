import React from 'react'
import cx from 'classnames'
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel
} from 'material-ui'
import s from './styles.css'

export default class RadioField extends React.Component {
  onChange = (evt, value) => this.props.onChange(this.props.name, value)

  render() {
    const { name, label, values, selected, className } = this.props

    return (
      <FormControl classes={{ root: cx(s.formControl, className) }}>
        <FormLabel classes={{ root: s.formLabel }}>{label}</FormLabel>
        <RadioGroup
          classes={{ root: s.radioGroup }}
          value={selected}
          onChange={this.onChange}
        >
          {values.map(v => (
            <FormControlLabel
              key={`${name}-${v.value}`}
              classes={{
                root: s.formControlLabelRoot,
                label: s.formControlLabelLabel
              }}
              value={v.value}
              label={v.label}
              control={
                <Radio
                  classes={{
                    default: s.radioDefault,
                    checked: s.radioChecked,
                    disabled: s.radioDisabled
                  }}
                />
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    )
  }
}
