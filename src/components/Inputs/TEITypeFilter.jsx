import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroupField } from '../index.js'

const teiTypeFilterOptions = [
    { value: 'PROGRAM', label: i18n.t('Program') },
    { value: 'TE', label: i18n.t('Tracked entity type') },
]
const defaultTEITypeFilterOption = teiTypeFilterOptions[0].value

const NAME = 'teiTypeFilter'
const DATATEST = 'input-tei-type-filter'
const LABEL = i18n.t('Filter by')

const TEITypeFilter = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={teiTypeFilterOptions}
        dataTest={DATATEST}
    />
)

export { TEITypeFilter, defaultTEITypeFilterOption }
