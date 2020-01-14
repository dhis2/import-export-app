import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import i18n from '@dhis2/d2-i18n'

import { Field } from '../Field/Field'
import { Label } from '../Field/Label'
import { Select } from '../FinalFormComponents/Select'
import { fetchUniqueDataElementAttributes } from '../../reducers/attributes/thunks'
import {
    getDataElementAttributes,
    getDataElementAttributesError,
    getDataElementAttributesLoaded,
    getDataElementAttributesLoading,
} from '../../reducers/attributes/selectors'

export const OPTION_UID = { value: 'UID', label: i18n.t('Uid') }
export const OPTION_CODE = { value: 'CODE', label: i18n.t('Code') }
export const OPTION_NAME = { value: 'NAME', label: i18n.t('Name') }

export const DATA_ELEMENT_ID_SCHEME_DEFAULT_OPTIONS = [
    OPTION_UID,
    OPTION_CODE,
    OPTION_NAME,
]
export const DATA_ELEMENT_ID_SCHEME_KEY = 'dataElementIdScheme'
export const DATA_ELEMENT_ID_SCHEME_DEFAULT_VALUE = OPTION_UID.value

const dataElementIdSchemeLabel = i18n.t('Data element id scheme')

const useLoadDataElementAttributes = () => {
    const dispatch = useDispatch()
    const loading = useSelector(getDataElementAttributesLoading)
    const loaded = useSelector(getDataElementAttributesLoaded)
    const error = useSelector(getDataElementAttributesError)

    useEffect(() => {
        if (!loaded && !loading && !error) {
            dispatch(fetchUniqueDataElementAttributes())
        }
    }, [loaded, loading, error, dispatch])
}

export const DataElementIdScheme = () => {
    useLoadDataElementAttributes()

    const attributes = useSelector(getDataElementAttributes)
    const loading = useSelector(getDataElementAttributesLoading)
    const loaded = useSelector(getDataElementAttributesLoaded)

    if (!loaded || loading) return <DataElementIdSchemeLoading />

    const options = [
        ...DATA_ELEMENT_ID_SCHEME_DEFAULT_OPTIONS,
        ...attributes.map(({ id, displayName: label }) => ({
            value: `ATTRIBUTE:${id}`,
            label,
        })),
    ]

    return (
        <Field>
            <Select
                name={DATA_ELEMENT_ID_SCHEME_KEY}
                label={dataElementIdSchemeLabel}
                options={options}
                dataTest="input-data-element-id-scheme"
            />
        </Field>
    )
}

export const DataElementIdSchemeLoading = () => (
    <div data-test="input-data-element-id-scheme-loading">
        <Field>
            <Label>{dataElementIdSchemeLabel}</Label>
            {i18n.t('Loading data element id scheme options...')}
        </Field>
    </div>
)
