import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { DATE_VALIDATOR } from '../DatePicker/DatePickerField.js'
import { DatePickerField } from '../index.js'


const NAME = 'startDate'
const DATATEST = 'input-start-date'
const LABEL = i18n.t('Start date')
const VALIDATOR = composeValidators(hasValue, DATE_VALIDATOR)

const StartDate = ({name, label}) => (
    <DatePickerField
        name={name ?? NAME}
        validator={VALIDATOR}
        label={label ?? LABEL}
        dataTest={DATATEST}
    />
)

StartDate.propTypes = {
    label: PropTypes.string,
    name:  PropTypes.string
}
export { StartDate }
