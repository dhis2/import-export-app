import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../index'

const importReportModeOptions = [
    {
        value: 'ERRORS',
        label: i18n.t('Only include reports for objects that have errors'),
    },
    {
        value: 'FULL',
        label: i18n.t('Reports for all objects imported'),
    },
    {
        value: 'DEBUG',
        label: i18n.t(
            'Reports for all objects imported along with their names (if available)'
        ),
    },
]
const defaultImportReportModeOption = importReportModeOptions[0]

const NAME = 'importReportMode'
const DATATEST = 'input-import-report-mode'
const LABEL = i18n.t('Import report mode')
const HELPTEXT = i18n.t(
    'Controls what should be reported after the import is done'
)

const ImportReportMode = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={importReportModeOptions}
        helpText={HELPTEXT}
        dataTest={DATATEST}
        vertical
    />
)

export { ImportReportMode, defaultImportReportModeOption }
