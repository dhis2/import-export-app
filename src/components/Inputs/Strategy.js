import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../form/RadioGroup'

export const OPTION_NEW_AND_UPDATES = {
    value: 'NEW_AND_UPDATES',
    label: i18n.t('New and updates'),
}
export const OPTION_NEW = { value: 'NEW', label: i18n.t('New only') }
export const OPTION_UPDATES = {
    value: 'UPDATES',
    label: i18n.t('Updates only'),
}
export const OPTION_DELETE = { value: 'DELETE', label: i18n.t('Delete') }
export const STRATEGY_KEY = 'strategy'
export const STRATEGY_DEFAULT_VALUE = OPTION_NEW_AND_UPDATES.value

export const Strategy = () => (
    <RadioGroup
        name={STRATEGY_KEY}
        label={i18n.t('Strategy')}
        options={[
            OPTION_NEW_AND_UPDATES,
            OPTION_NEW,
            OPTION_UPDATES,
            OPTION_DELETE,
        ]}
    />
)
