import React from 'react'
import i18n from '@dhis2/d2-i18n'

import { Field } from '../Field/Field'
import { Label } from '../Field/Label'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'

export const OPTION_SELECTED = {
    value: 'selected',
    label: i18n.t('Selected organisation unit'),
}
export const OPTION_CHILDREN = {
    value: 'children',
    label: i18n.t('Include children of organisation unit'),
}
export const OPTION_DESCENDANTS = {
    value: 'descendants',
    label: i18n.t('Include descendants of organisation unit'),
}

export const INCLUSION_KEY = 'inclusion'
export const INCLUSION_DEFAULT_VALUE = OPTION_SELECTED.value

export const Inclusion = () => (
    <Field>
        <Label>{i18n.t('Inclusion')}</Label>
        <RadioGroup
            name={INCLUSION_KEY}
            label={i18n.t('Inclusion')}
            options={[OPTION_SELECTED, OPTION_CHILDREN, OPTION_DESCENDANTS]}
        />
    </Field>
)
