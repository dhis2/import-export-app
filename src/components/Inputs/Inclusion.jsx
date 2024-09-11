import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroupField } from '../index.js'

const inclusionOptions = [
    {
        value: 'SELECTED',
        label: i18n.t('Only include selected organisation unit'),
        prefix: i18n.t('Selected'),
    },
    {
        value: 'CHILDREN',
        label: i18n.t('Include the first level of units inside selections'),
        prefix: i18n.t('Directly below'),
    },
    {
        value: 'DESCENDANTS',
        label: i18n.t('Include all units inside selections'),
        prefix: i18n.t('All below'),
    },
]
const defaultInclusionOption = inclusionOptions[0].value

const NAME = 'inclusion'
const DATATEST = 'input-inclusion'
const LABEL = i18n.t(
    'How should organisation units inside the selections be included?'
)

const Inclusion = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={inclusionOptions}
        dataTest={DATATEST}
        vertical
    />
)

export { Inclusion, defaultInclusionOption }
