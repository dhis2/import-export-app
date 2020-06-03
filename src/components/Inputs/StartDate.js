import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators } from '@dhis2/ui-forms'
import { DatePickerField } from '../index'
import { DATE_VALIDATOR } from '../DatePicker/DatePickerField'

const NAME = 'startDate'
const DATATEST = 'input-start-date'
const LABEL = i18n.t('Start date')
const VALIDATOR = composeValidators(hasValue, DATE_VALIDATOR)

const StartDate = () => (
    <DatePickerField
        name={NAME}
        validator={VALIDATOR}
        label={LABEL}
        dataTest={DATATEST}
    />
)

export { StartDate }
