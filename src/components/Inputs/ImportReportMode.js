import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../'

const importReportModeOptions = [
    { value: 'ERRORS', label: i18n.t('Errors') },
    { value: 'FULL', label: i18n.t('Full') },
    { value: 'DEBUG', label: i18n.t('Debug') },
]
const defaultImportReportModeOption = importReportModeOptions[0]

const NAME = 'importReportMode'
const DATATEST = 'input-import-report-mode'
const LABEL = i18n.t('Import report mode')

const ImportReportMode = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={importReportModeOptions}
        dataTest={DATATEST}
    />
)

export { ImportReportMode, defaultImportReportModeOption }
