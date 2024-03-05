import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { DATE_VALIDATOR } from '../DatePicker/DatePickerField.js'
import { DatePickerField } from '../index.js'

const NAME = 'endDate'
const DATATEST = 'input-end-date'
const LABEL = i18n.t('End date')
const VALIDATOR = composeValidators(hasValue, DATE_VALIDATOR)

const EndDate = ({name, label}) => (
    <DatePickerField
        name={name ?? NAME}
        validator={VALIDATOR}
        label={label ?? LABEL}
        dataTest={DATATEST}
    />
)

EndDate.propTypes = {
    label: PropTypes.string,
    name:  PropTypes.string
}

export { EndDate }
