import React from 'react'
import cx from 'classnames'
import moment from 'moment'
import { FormControl, FormLabel } from 'components/material-ui'
// import { DatePicker } from 'material-ui-pickers'
import s from './styles.css'

export default class DateField extends React.Component {
  onChange = date => this.props.onChange(this.props.name, date.toDate())

  render() {
    const { name, label, value, className, minDate } = this.props
    const format = this.props.format || moment.localeData().longDateFormat('L')

    return (
      <FormControl classes={{ root: cx(s.formControl, className) }}>
        <FormLabel classes={{ root: s.formLabel }}>{label}</FormLabel>
        {/*<DatePicker
          name={name}
          format={format}
          minDate={minDate}
          value={moment(value, format)}
          onChange={this.onChange}
          autoOk={true}
          animateYearScrolling={false}
        />*/}
      </FormControl>
    )
  }
}
