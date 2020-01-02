import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_ERRORS = { value: 'ERRORS', label: i18n.t('Errors') }
export const OPTION_FULL = { value: 'FULL', label: i18n.t('Full') }
export const OPTION_DEBUG = { value: 'DEBUG', label: i18n.t('Debug') }

export const IMPORT_REPORT_MODE_KEY = 'importReportMode'
export const IMPORT_REPORT_MODE_DEFAULT_VALUE = OPTION_ERRORS.value

export const ImportReportMode = () => (
    <RadioGroup
        name={IMPORT_REPORT_MODE_KEY}
        label={i18n.t('Import report mode')}
        options={[OPTION_ERRORS, OPTION_FULL, OPTION_DEBUG]}
        dataTest="input-import-report-mode"
    />
)
