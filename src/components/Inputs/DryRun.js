import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { Field } from '../Field/Field'
import { Label } from '../Field/Label'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_YES = { value: 'true', label: i18n.t('Yes') }
export const OPTION_NO = { value: 'false', label: i18n.t('No') }
export const DRY_RUN_KEY = 'dryRun'
export const DRY_RUN_DEFAULT_VALUE = OPTION_NO.value

export const DryRun = () => (
    <Field>
        <Label>{i18n.t('Dry run')}</Label>
        <RadioGroup
            name={DRY_RUN_KEY}
            label={i18n.t('Dry run')}
            options={[OPTION_YES, OPTION_NO]}
            dataTest="input-dry-run"
        />
    </Field>
)
