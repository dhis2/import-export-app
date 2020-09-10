import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../index'

const inclusionStrategyOptions = [
    {
        value: 'NON_NULL',
        label: i18n.t('NON NULL: Includes properties which are not null', {
            nsSeparator: '>',
        }),
    },
    {
        value: 'ALWAYS',
        label: i18n.t('ALWAYS: Include all properties', {
            nsSeparator: '>',
        }),
    },
    {
        value: 'NON_EMPTY',
        label: i18n.t('NON EMPTY: Include non-empty properties', {
            nsSeparator: '>',
        }),
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
