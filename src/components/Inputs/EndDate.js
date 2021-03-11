import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators } from '@dhis2/ui'
import React from 'react'
import { DATE_VALIDATOR } from '../DatePicker/DatePickerField'
import { DatePickerField } from '../index'

const NAME = 'endDate'
const DATATEST = 'input-end-date'
const LABEL = i18n.t('End date')
const VALIDATOR = composeValidators(hasValue, DATE_VALIDATOR)

const EndDate = () => (
    <DatePickerField
        name={NAME}
        validator={VALIDATOR}
        label={LABEL}
        dataTest={DATATEST}
    />
)

export { EndDate }
