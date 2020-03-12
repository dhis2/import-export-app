import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { inclusionStrategyOptions } from '../../utils/options'
import { RadioGroupField } from '../RadioGroup'

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

export { InclusionStrategy }
