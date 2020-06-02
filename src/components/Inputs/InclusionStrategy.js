import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../'

const inclusionStrategyOptions = [
    { value: 'NON_NULL', label: i18n.t('Non Null') },
    { value: 'ALWAYS', label: i18n.t('Always') },
    { value: 'NON_EMPTY', label: i18n.t('Non Empty') },
]
const defaultInclusionStrategyOption = inclusionStrategyOptions[0]

const NAME = 'inclusionStrategy'
const DATATEST = 'input-inclusion-strategy'
const LABEL = i18n.t('Inclusion strategy')

const InclusionStrategy = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={inclusionStrategyOptions}
        dataTest={DATATEST}
    />
)

export { InclusionStrategy, defaultInclusionStrategyOption }
