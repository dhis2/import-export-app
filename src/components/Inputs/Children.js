import React from 'react'
import i18n from '@dhis2/d2-i18n'

import { Field } from '../Field/Field'
import { Label } from '../Field/Label'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_YES = {
    value: 'true',
    label: i18n.t('Include descendants of organisation unit'),
}
export const OPTION_NO = {
    value: 'false',
    label: i18n.t('Selected organisation unit'),
}
export const CHILDREN_KEY = 'children'
export const CHILDREN_DEFAULT_VALUE = OPTION_YES.value

export const Children = () => (
    <Field>
        <Label>{i18n.t('Children')}</Label>
        <RadioGroup
            name={CHILDREN_KEY}
            label={i18n.t('Children')}
            options={[OPTION_YES, OPTION_NO]}
        />
    </Field>
)
