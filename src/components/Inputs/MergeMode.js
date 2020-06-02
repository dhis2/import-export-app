import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../'

const mergeModeOptions = [
    { value: 'MERGE', label: i18n.t('Merge') },
    { value: 'REPLACE', label: i18n.t('Replace') },
]
const defaultMergeModeOption = mergeModeOptions[0]

const NAME = 'mergeMode'
const DATATEST = 'input-merge-mode'
const LABEL = i18n.t('Merge mode')

const MergeMode = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={mergeModeOptions}
        dataTest={DATATEST}
    />
)

export { MergeMode, defaultMergeModeOption }
