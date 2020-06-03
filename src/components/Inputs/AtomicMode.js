import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../index'

const atomicModeOptions = [
    { value: 'ALL', label: i18n.t('All') },
    { value: 'NONE', label: i18n.t('None') },
]
const defaultAtomicModeOption = atomicModeOptions[0]

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

export { AtomicMode, defaultAtomicModeOption }
