import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_ERRORS = { value: 'ERRORS', label: i18n.t('ERRORS') }
export const OPTION_FULL = { value: 'FULL', label: i18n.t('Full') }
export const OPTION_DEBUG = { value: 'DEBUG', label: i18n.t('DEBUG') }
export const REPORT_MODE_KEY = 'reportMode'
export const REPORT_MODE_DEFAULT_VALUE = OPTION_ERRORS.value

export const ReportMode = () => (
    <RadioGroup
        name={REPORT_MODE_KEY}
        label={i18n.t('Report mode')}
        options={[OPTION_ERRORS, OPTION_FULL, OPTION_DEBUG]}
    />
)
