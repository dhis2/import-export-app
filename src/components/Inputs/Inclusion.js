import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { inclusionOptions } from '../../utils/options'
import { RadioGroupField } from '../'

const NAME = 'inclusion'
const DATATEST = 'input-inclusion'
const LABEL = i18n.t('Inclusion')

const Inclusion = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={inclusionOptions}
        dataTest={DATATEST}
    />
)

export { Inclusion }
