import React from 'react'
import i18n from '@dhis2/d2-i18n'

import { Field } from '../Field/Field'
import { Label } from '../Field/Label'
import { OrgUnitTree } from '../FinalFormComponents/OrgUnitTree'

export const ORG_UNIT_KEY = 'orgUnit'
export const ORG_UNIT_DEFAULT_VALUE = []

export const OrgUnit = () => (
    <Field>
        <Label>{i18n.t('Organisation unit')}</Label>
        <OrgUnitTree name={ORG_UNIT_KEY} label={i18n.t('Organisation unit')} />
    </Field>
)
