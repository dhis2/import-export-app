import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../'
import { lastUpdatedFilterOptions } from '../../utils/options'

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

export { LastUpdatedFilter }
