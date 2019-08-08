import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_MERGE = { value: 'MERGE', label: i18n.t('Merge') }
export const OPTION_REPLACE = { value: 'REPLACE', label: i18n.t('Replace') }
export const MERGE_MODE_KEY = 'mergeMode'
export const MERGE_MODE_DEFAULT_VALUE = OPTION_MERGE.value

export const MergeMode = () => (
    <RadioGroup
        name={MERGE_MODE_KEY}
        label={i18n.t('Merge mode')}
        options={[OPTION_MERGE, OPTION_REPLACE]}
    />
)
