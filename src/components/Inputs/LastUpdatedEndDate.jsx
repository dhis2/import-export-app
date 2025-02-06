import i18n from '@dhis2/d2-i18n'
import { composeValidators } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { OPTIONAL_DATE_VALIDATOR } from '../DatePicker/DatePickerField.jsx'
import { DatePickerField } from '../index.js'

const NAME = 'updatedBefore'
const DATATEST = 'input-last-updated-end-date'
const LABEL = i18n.t('Last updated end date')
const VALIDATOR = composeValidators(OPTIONAL_DATE_VALIDATOR)

const LastUpdatedEndDate = ({ show }) =>
    show && (
        <DatePickerField
            name={NAME}
            validator={VALIDATOR}
            label={LABEL}
            dataTest={DATATEST}
        />
    )

LastUpdatedEndDate.propTypes = {
    show: PropTypes.bool,
}

export { LastUpdatedEndDate }
