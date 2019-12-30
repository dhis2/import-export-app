import React from 'react'
import i18n from '@dhis2/d2-i18n'

import { Field } from '../Field/Field'
import { Label } from '../Field/Label'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_YES = { value: 'true', label: i18n.t('Yes') }
export const OPTION_NO = { value: 'false', label: i18n.t('No') }
export const INCLUDE_DELETE_KEY = 'includeDelete'
export const INCLUDE_DELETE_DEFAULT_VALUE = OPTION_NO.value

export const IncludeDelete = () => (
    <Field>
        <Label>{i18n.t('Include delete')}</Label>
        <RadioGroup
            name={INCLUDE_DELETE_KEY}
            label={i18n.t('Include delete')}
            options={[OPTION_YES, OPTION_NO]}
        />
    </Field>
)
