import { Label } from '../Field/Label'

import { Field } from '../Field/Field'

import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import i18n from '@dhis2/d2-i18n'

import { Select } from '../FinalFormComponents/Select'
import { fetchUniqueOrgUnitAttributes } from '../../reducers/attributes/thunks'
import {
    getOrgUnitAttributes,
    getOrgUnitAttributesError,
    getOrgUnitAttributesLoaded,
    getOrgUnitAttributesLoading,
} from '../../reducers/attributes/selectors'

export const OPTION_UID = { value: 'UID', label: i18n.t('Uid') }
export const OPTION_CODE = { value: 'CODE', label: i18n.t('Code') }
export const OPTION_NAME = { value: 'NAME', label: i18n.t('Name') }

export const ORG_UNIT_ID_SCHEME_DEFAULT_OPTIONS = [
    OPTION_UID,
    OPTION_CODE,
    OPTION_NAME,
]
export const ORG_UNIT_ID_SCHEME_KEY = 'orgUnitIdScheme'
export const ORG_UNIT_ID_SCHEME_DEFAULT_VALUE = OPTION_UID.value

const orgUnitIdSchemeLabel = i18n.t('Org unit id scheme')

const useLoadOrgUnitAttributes = () => {
    const dispatch = useDispatch()
    const loading = useSelector(getOrgUnitAttributesLoading)
    const loaded = useSelector(getOrgUnitAttributesLoaded)
    const error = useSelector(getOrgUnitAttributesError)

    useEffect(() => {
        if (!loaded && !loading && !error) {
            dispatch(fetchUniqueOrgUnitAttributes())
        }
    }, [loaded, loading, error, dispatch])
}

export const OrgUnitIdScheme = () => {
    useLoadOrgUnitAttributes()

    const attributes = useSelector(getOrgUnitAttributes)
    const loading = useSelector(getOrgUnitAttributesLoading)
    const loaded = useSelector(getOrgUnitAttributesLoaded)

    if (!loaded || loading) return <OrgUnitIdSchemeLoading />

    const options = [
        ...ORG_UNIT_ID_SCHEME_DEFAULT_OPTIONS,
        ...attributes.map(({ id, displayName: label }) => ({
            value: `ATTRIBUTE:${id}`,
            label,
        })),
    ]

    return (
        <Field>
            <Select
                name={ORG_UNIT_ID_SCHEME_KEY}
                label={orgUnitIdSchemeLabel}
                options={options}
                dataTest="input-org-unit-id-scheme"
            />
        </Field>
    )
}

export const OrgUnitIdSchemeLoading = () => (
    <div data-test="input-org-unit-id-scheme-loading">
        <Field>
            <Label>{orgUnitIdSchemeLabel}</Label>
            {i18n.t('Loading organisation unit id scheme options...')}
        </Field>
    </div>
)
