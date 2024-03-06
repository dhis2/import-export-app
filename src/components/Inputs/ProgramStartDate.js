import i18n from '@dhis2/d2-i18n'
import { composeValidators } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { OPTIONAL_DATE_VALIDATOR } from '../DatePicker/DatePickerField.js'
import { DatePickerField } from '../index.js'

const NAME = 'enrollmentEnrolledAfter'
const DATATEST = 'input-program-start-date'
const LABEL = i18n.t('Start date')
const VALIDATOR = composeValidators(OPTIONAL_DATE_VALIDATOR)

const ProgramStartDate = ({ show }) =>
    show && (
        <DatePickerField
            name={NAME}
            validator={VALIDATOR}
            label={LABEL}
            dataTest={DATATEST}
        />
    )

ProgramStartDate.propTypes = {
    show: PropTypes.bool,
}

export { ProgramStartDate }
