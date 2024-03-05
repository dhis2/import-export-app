import i18n from '@dhis2/d2-i18n'
import { composeValidators } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { OPTIONAL_DATE_VALIDATOR } from '../DatePicker/DatePickerField.js'
import { DatePickerField } from '../index.js'

const NAME = 'enrollmentEnrolledBefore'
const DATATEST = 'input-program-end-date'
const LABEL = i18n.t('End date')
const VALIDATOR = composeValidators(OPTIONAL_DATE_VALIDATOR)

const ProgramEndDate = ({ show }) =>
    show && (
        <DatePickerField
            name={NAME}
            validator={VALIDATOR}
            label={LABEL}
            dataTest={DATATEST}
        />
    )

ProgramEndDate.propTypes = {
    show: PropTypes.bool,
}

export { ProgramEndDate }
