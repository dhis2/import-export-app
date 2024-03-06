import i18n from '@dhis2/d2-i18n'
import { composeValidators } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { OPTIONAL_DATE_VALIDATOR } from '../DatePicker/DatePickerField.js'
import { DatePickerField } from '../index.js'

const NAME = 'updatedAfter'
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
