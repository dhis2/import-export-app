import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../index'

const lastUpdatedFilterOptions = [
    { value: 'NONE', label: i18n.t('None') },
    { value: 'DATE', label: i18n.t('Start and end date') },
    { value: 'DURATION', label: i18n.t('Duration') },
]
const defaultLastUpdatedFilterOption = lastUpdatedFilterOptions[0]

const NAME = 'lastUpdatedFilter'
const DATATEST = 'input-last-updated-filter'
const LABEL = i18n.t('Filter by last updated')

const LastUpdatedFilter = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={lastUpdatedFilterOptions}
        dataTest={DATATEST}
    />
)

export { LastUpdatedFilter, defaultLastUpdatedFilterOption }
