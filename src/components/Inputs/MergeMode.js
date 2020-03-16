import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { mergeModeOptions } from '../../utils/options'
import { RadioGroupField } from '../'

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

export { MergeMode }
