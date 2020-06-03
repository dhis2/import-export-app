import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../index'

const strategyOptions = [
    { value: 'NEW_AND_UPDATES', label: i18n.t('New and updates') },
    { value: 'NEW', label: i18n.t('New only') },
    { value: 'UPDATES', label: i18n.t('Updates only') },
    { value: 'DELETE', label: i18n.t('Delete') },
]
const defaultStrategyOption = strategyOptions[0]

const NAME = 'strategy'
const DATATEST = 'input-strategy'
const LABEL = i18n.t('Strategy')

const Strategy = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={strategyOptions}
        dataTest={DATATEST}
    />
)

export { Strategy, defaultStrategyOption }
