import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { composeValidators } from '@dhis2/ui-forms'
import { DatePickerField } from '../'
import { OPTIONAL_DATE_VALIDATOR } from '../DatePicker/DatePickerField'

const NAME = 'programEndDate'
const DATATEST = 'input-program-end-date'
const LABEL = i18n.t('Program end date')
const VALIDATOR = composeValidators(OPTIONAL_DATE_VALIDATOR)

const ProgramEndDate = () => (
    <DatePickerField
        name={NAME}
        validator={VALIDATOR}
        label={LABEL}
        dataTest={DATATEST}
    />
)

export { ProgramEndDate }
