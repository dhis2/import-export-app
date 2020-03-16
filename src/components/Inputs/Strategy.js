import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { strategyOptions } from '../../utils/options'
import { RadioGroupField } from '../'

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

export { Strategy }
