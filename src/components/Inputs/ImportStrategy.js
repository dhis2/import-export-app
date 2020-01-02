import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_CREATE_AND_UPDATE = {
    value: 'CREATE_AND_UPDATE',
    label: i18n.t('New and updates'),
}
export const OPTION_CREATE = { value: 'CREATE', label: i18n.t('New only') }
export const OPTION_UPDATES = {
    value: 'UPDATES',
    label: i18n.t('Updates only'),
}
export const OPTION_DELETE = { value: 'DELETE', label: i18n.t('Delete') }
export const IMPORT_STRATEGY_KEY = 'importStrategy'
export const IMPORT_STRATEGY_DEFAULT_VALUE = OPTION_CREATE_AND_UPDATE.value

export const ImportStrategy = () => (
    <RadioGroup
        name={IMPORT_STRATEGY_KEY}
        label={i18n.t('Import strategy')}
        options={[
            OPTION_CREATE_AND_UPDATE,
            OPTION_CREATE,
            OPTION_UPDATES,
            OPTION_DELETE,
        ]}
        dataTest="input-import-stragegy"
    />
)
