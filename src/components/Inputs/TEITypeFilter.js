import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../'
import { teiTypeFilterOptions } from '../../utils/options'

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

export { TEITypeFilter }
