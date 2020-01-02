import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_WITH_SHARING = {
    value: 'false',
    label: i18n.t('With sharing'),
}
export const OPTION_WITHOUT_SHARING = {
    value: 'true',
    label: i18n.t('Without sharing'),
}

export const SHARING_KEY = 'skipSharing'
export const SHARING_DEFAULT_VALUE = OPTION_WITH_SHARING.value

export const Sharing = () => (
    <RadioGroup
        name={SHARING_KEY}
        label={i18n.t('Sharing')}
        options={[OPTION_WITH_SHARING, OPTION_WITHOUT_SHARING]}
        dataTest="input-sharing"
    />
)
