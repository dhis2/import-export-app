import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroupField } from '../index.js'

const preheatModeOptions = [
    { value: 'REFERENCE', label: i18n.t('Intelligent scan (reference)') },
    { value: 'ALL', label: i18n.t('All') },
    { value: 'NONE', label: i18n.t('None') },
]
const defaultPreheatModeOption = preheatModeOptions[0].value

const NAME = 'preheatMode'
const DATATEST = 'input-preheat-mode'
const LABEL = i18n.t('Preheat mode')
const HELPTEXT = i18n.t('Controls the level of preheating that should be done')

const PreheatMode = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={preheatModeOptions}
        helpText={HELPTEXT}
        dataTest={DATATEST}
    />
)

export { PreheatMode, defaultPreheatModeOption }
