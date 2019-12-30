import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'
import { Field } from '../Field/Field'
import { Label } from '../Field/Label'

export const OPTION_ERRORS = { value: 'ERRORS', label: i18n.t('Error') }
export const OPTION_FULL = { value: 'FULL', label: i18n.t('Full') }
export const OPTION_DEBUG = { value: 'DEBUG', label: i18n.t('Debug') }

export const REPORT_MODE_KEY = 'reportMode'
export const REPORT_MODE_DEFAULT_VALUE = OPTION_ERRORS.value

export const ReportMode = () => (
    <Field>
        <Label>{i18n.t('Report mode')}</Label>
        <RadioGroup
            name={REPORT_MODE_KEY}
            label={i18n.t('Report mode')}
            options={[OPTION_ERRORS, OPTION_FULL, OPTION_DEBUG]}
            dataTest="input-report-mode"
        />
    </Field>
)
