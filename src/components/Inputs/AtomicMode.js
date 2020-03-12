import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { atomicModeOptions } from '../../utils/options'
import { RadioGroupField } from '../RadioGroup'

const NAME = 'atomicMode'
const DATATEST = 'input-atomic-mode'
const LABEL = i18n.t('Atomic mode')

const AtomicMode = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={atomicModeOptions}
        dataTest={DATATEST}
    />
)

export { AtomicMode }
