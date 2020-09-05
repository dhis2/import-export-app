import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../index'

const atomicModeOptions = [
    { value: 'ALL', label: i18n.t('Do not import') },
    { value: 'NONE', label: i18n.t('Import') },
]
const defaultAtomicModeOption = atomicModeOptions[0]

const NAME = 'atomicMode'
const DATATEST = 'input-atomic-mode'
const LABEL = i18n.t('Atomic mode')
const HELPTEXT = i18n.t(
    'Whether to import objects even if some references do not exist'
)

const AtomicMode = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={atomicModeOptions}
        helpText={HELPTEXT}
        dataTest={DATATEST}
    />
)

export { AtomicMode, defaultAtomicModeOption }
