import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { composeValidators } from '@dhis2/ui-forms'
import { DatePickerField } from '../'
import { OPTIONAL_DATE_VALIDATOR } from '../DatePicker/DatePickerField'

const NAME = 'programStartDate'
const DATATEST = 'input-program-start-date'
const LABEL = i18n.t('Program start date')
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
