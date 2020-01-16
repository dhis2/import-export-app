import React from 'react'
import moment from 'moment'
import DatePicker from 'material-ui/DatePicker'
import { FormControl, FormLabel } from '../material-ui'
import s from './styles.module.css'

const styles = {
    style: {
        height: 36,
    },
    textFieldStyle: {
        height: 36,
        fontSize: 15,
        fontWeight: 500,
    },
}

export default class DateField extends React.Component {
    onChange = (_, date) => this.props.onChange(this.props.name, date)

    render() {
        const { name, label, value, minDate, dataTest } = this.props
        const format =
            this.props.format || moment.localeData().longDateFormat('L')
        const marginTop = minDate ? 8 : 16

        return (
            <div data-test={dataTest}>
                <FormControl className={s.formControl} style={{ marginTop }}>
                    <FormLabel className={s.formLabel}>{label}</FormLabel>
                    <DatePicker
                        {...styles}
                        autoOk={true}
                        key={`datePickerField-${name}`}
                        name={`datePickerField-${name}`}
                        format={format}
                        minDate={minDate}
                        value={value}
                        onChange={this.onChange}
                    />
                </FormControl>
            </div>
        )
    }
}
