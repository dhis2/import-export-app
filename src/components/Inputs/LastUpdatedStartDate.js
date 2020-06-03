import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { composeValidators } from '@dhis2/ui-forms'
import { DatePickerField } from '../index'
import { OPTIONAL_DATE_VALIDATOR } from '../DatePicker/DatePickerField'

const NAME = 'lastUpdatedStartDate'
const DATATEST = 'input-last-updated-start-date'
const LABEL = i18n.t('Last updated start date')
const VALIDATOR = composeValidators(OPTIONAL_DATE_VALIDATOR)

const LastUpdatedStartDate = ({ show }) =>
    show && (
        <DatePickerField
            name={NAME}
            validator={VALIDATOR}
            label={LABEL}
            dataTest={DATATEST}
        />
    )

LastUpdatedStartDate.propTypes = {
    show: PropTypes.bool,
}

export { LastUpdatedStartDate }
