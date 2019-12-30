import { Label } from '../Field/Label'

import { Field } from '../Field/Field'

import { useSelector } from 'react-redux'
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import { Select } from '../FinalFormComponents/Select'
import {
    getSharedAttributes,
    getSharedAttributesLoading,
} from '../../reducers/attributes/selectors'

export const OPTION_UID = { value: 'UID', label: i18n.t('Uid') }
export const OPTION_CODE = { value: 'CODE', label: i18n.t('Code') }

export const ID_SCHEME_DEFAULT_OPTIONS = [OPTION_UID, OPTION_CODE]
export const ID_SCHEME_KEY = 'idScheme'
export const ID_SCHEME_DEFAULT_VALUE = OPTION_UID.value

const idSchemeLabel = i18n.t('Id scheme')
export const IdScheme = () => {
    const attributes = useSelector(getSharedAttributes)
    const loading = useSelector(getSharedAttributesLoading)

    if (loading) return <IdSchemeLoading />

    const options = [
        ...ID_SCHEME_DEFAULT_OPTIONS,
        ...attributes.map(({ id, displayName: label }) => ({
            value: `ATTRIBUTE:${id}`,
            label,
        })),
    ]

    return (
        <Field>
            <Select
                dataTest="input-id-scheme"
                name={ID_SCHEME_KEY}
                label={idSchemeLabel}
                options={options}
            />
        </Field>
    )
}

export const IdSchemeLoading = () => (
    <Field>
        <Label>{idSchemeLabel}</Label>
        {i18n.t('Loading organisation unit id scheme options...')}
    </Field>
)
