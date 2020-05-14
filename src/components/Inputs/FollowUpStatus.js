import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../'
import { followUpStatusOptions } from '../../utils/options'

const NAME = 'followUpStatus'
const DATATEST = 'input-follow-up-status'
const LABEL = i18n.t('Follow up status')

const FollowUpStatus = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={followUpStatusOptions}
        dataTest={DATATEST}
    />
)

export { FollowUpStatus }
