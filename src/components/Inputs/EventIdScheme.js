import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { RadioGroup } from '../FinalFormComponents/RadioGroup'
import { Field } from '../Field/Field'
import { Label } from '../Field/Label'

export const OPTION_UID = { value: 'UID', label: i18n.t('Uid') }
export const OPTION_CODE = { value: 'CODE', label: i18n.t('Code') }

export const EVENT_ID_SCHEME_KEY = 'eventIdScheme'
export const EVENT_ID_SCHEME_DEFAULT_VALUE = OPTION_UID.value

export const EventIdScheme = () => (
    <Field>
        <Label>{i18n.t('Event id scheme')}</Label>
        <RadioGroup
            name={EVENT_ID_SCHEME_KEY}
            label={i18n.t('Event id scheme')}
            options={[OPTION_UID, OPTION_CODE]}
            dataTest="input-event-id-scheme"
        />
    </Field>
)
