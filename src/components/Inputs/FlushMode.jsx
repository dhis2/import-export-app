import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroupField } from '../index.js'

const flushModeOptions = [
    { value: 'AUTO', label: i18n.t('Auto (recommended)') },
    { value: 'OBJECT', label: i18n.t('Object (debugging purposes)') },
]
const defaultFlushModeOption = flushModeOptions[0].value

const NAME = 'flushMode'
const DATATEST = 'input-flush-mode'
const LABEL = i18n.t('Flush mode')
const HELPTEXT = i18n.t('Controls when to flush the internal cache')

const FlushMode = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={flushModeOptions}
        helpText={HELPTEXT}
        dataTest={DATATEST}
    />
)

export { FlushMode, defaultFlushModeOption }
