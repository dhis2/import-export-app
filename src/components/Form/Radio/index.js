import React from 'react'
import { RadioButtonGroup, RadioButton } from 'material-ui'
import { FormLabel, FormControl } from '../material-ui'
import s from './styles.css'

const styles = {
  radioButtonGroup: {},
  radioButton: {
    iconStyle: {
      marginRight: 0
    },
    style: {
      width: 'auto'
    }
  }
}

export default class RadioField extends React.Component {
  onChange = (evt, value) => this.props.onChange(this.props.name, value)

  render() {
    const { name, label, values, selected } = this.props

    return (
      <FormControl className={s.formControl}>
        <FormLabel className={s.formLabel}>{label}</FormLabel>
        <RadioButtonGroup
          {...styles.radioButtonGroup}
          name={`radioGroup-${name}`}
          className={s.radioGroup}
          valueSelected={selected}
          onChange={this.onChange}
        >
          {values.map(v => (
            <RadioButton
              {...styles.radioButton}
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
