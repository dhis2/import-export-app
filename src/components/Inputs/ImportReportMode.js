import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { importReportModeOptions } from '../../utils/options'
import { RadioGroupField } from '../RadioGroup'

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

export { ImportReportMode }
