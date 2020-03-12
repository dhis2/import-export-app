import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { flushModeOptions } from '../../utils/options'
import { RadioGroupField } from '../RadioGroup'

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

export { FlushMode }
