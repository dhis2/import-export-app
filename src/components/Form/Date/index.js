import React from 'react'
import moment from 'moment'
import DatePicker from 'material-ui/DatePicker'
import { FormControl, FormLabel } from 'components/material-ui'
import s from './styles.css'

export default class DateField extends React.Component {
  onChange = (_, date) => this.props.onChange(this.props.name, date)

  render() {
    const { name, label, value, minDate } = this.props
    const format = this.props.format || moment.localeData().longDateFormat('L')

    return (
      <FormControl className={s.formControl}>
        <FormLabel className={s.formLabel}>{label}</FormLabel>
        <DatePicker
          autoOk={true}
          name={name}
          format={format}
          minDate={minDate}
          value={moment(value, format).toDate()}
          onChange={this.onChange}
        />
      </FormControl>
    )
  }
}
