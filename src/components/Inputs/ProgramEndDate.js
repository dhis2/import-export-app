import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { composeValidators } from '@dhis2/ui-forms'
import { DatePickerField } from '../index'
import { OPTIONAL_DATE_VALIDATOR } from '../DatePicker/DatePickerField'

const NAME = 'programEndDate'
const DATATEST = 'input-program-end-date'
const LABEL = i18n.t('Program end date')
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
