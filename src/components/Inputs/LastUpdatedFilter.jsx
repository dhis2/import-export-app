import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroupField } from '../index.js'

const lastUpdatedFilterOptions = [
    { value: 'NONE', label: i18n.t('Do not filter by last updated date') },
    { value: 'DATE', label: i18n.t('Start/end dates') },
    { value: 'DURATION', label: i18n.t('Time since last updated') },
]
const defaultLastUpdatedFilterOption = lastUpdatedFilterOptions[0].value

const NAME = 'lastUpdatedFilter'
const DATATEST = 'input-last-updated-filter'
const LABEL = i18n.t('Filter by last updated date')

const LastUpdatedFilter = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={lastUpdatedFilterOptions}
        dataTest={DATATEST}
    />
)

export { LastUpdatedFilter, defaultLastUpdatedFilterOption }
