import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { preheatModeOptions } from '../../utils/options'
import { RadioGroupField } from '../RadioGroup'

const NAME = 'preheatMode'
const DATATEST = 'input-preheat-mode'
const LABEL = i18n.t('Preheat mode')

const PreheatMode = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={preheatModeOptions}
        dataTest={DATATEST}
    />
)

export { PreheatMode }
