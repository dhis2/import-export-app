import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroupField } from '../index.js'

const inclusionStrategyOptions = [
    {
        value: 'NON_NULL',
        label: i18n.t('Includes properties which are not null'),
        prefix: i18n.t('Non null'),
    },
    {
        value: 'ALWAYS',
        label: i18n.t('Include all properties'),
        prefix: i18n.t('Always'),
    },
    {
        value: 'NON_EMPTY',
        label: i18n.t('Include non-empty properties'),
        prefix: i18n.t('Non empty'),
    },
]
const defaultInclusionStrategyOption = inclusionStrategyOptions[0].value

const NAME = 'inclusionStrategy'
const DATATEST = 'input-inclusion-strategy'
const LABEL = i18n.t('Inclusion strategy')
const HELPTEXT = i18n.t('Controls which properties to include')

const InclusionStrategy = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={inclusionStrategyOptions}
        helpText={HELPTEXT}
        dataTest={DATATEST}
        vertical
    />
)

export { InclusionStrategy, defaultInclusionStrategyOption }
