import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../'

const flushModeOptions = [
    { value: 'AUTO', label: i18n.t('Auto') },
    { value: 'OBJECT', label: i18n.t('Object') },
]
const defaultFlushModeOption = flushModeOptions[0]

const NAME = 'flushMode'
const DATATEST = 'input-flush-mode'
const LABEL = i18n.t('Flush mode')

const FlushMode = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={flushModeOptions}
        dataTest={DATATEST}
    />
)

export { FlushMode, defaultFlushModeOption }
