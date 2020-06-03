import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../index'

const inclusionOptions = [
    {
        value: 'SELECTED',
        label: i18n.t('Selected organisation unit'),
    },
    {
        value: 'CHILDREN',
        label: i18n.t('Include children of organisation unit'),
    },
    {
        value: 'DESCENDANTS',
        label: i18n.t('Include descendants of organisation unit'),
    },
]
const defaultInclusionOption = inclusionOptions[0]

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

export { Inclusion, defaultInclusionOption }
