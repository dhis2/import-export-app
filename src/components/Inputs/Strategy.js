import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../index'

const strategyOptions = [
    {
        value: 'NEW_AND_UPDATES',
        label: i18n.t('Import new values and update existing'),
    },
    {
        value: 'NEW',
        label: i18n.t('Import new values only'),
    },
    {
        value: 'UPDATES',
        label: i18n.t('Only update existing values, ignore new values'),
    },
    {
        value: 'DELETE',
        label: i18n.t('DELETE: Remove values included in uploaded file'),
    },
]
const defaultStrategyOption = strategyOptions[0].value

const NAME = 'strategy'
const DATATEST = 'input-strategy'
const LABEL = i18n.t('Strategy')

const Strategy = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={strategyOptions}
        dataTest={DATATEST}
        vertical
    />
)

export { Strategy, defaultStrategyOption }
