import { FormSpy, useForm } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import i18n from '@dhis2/d2-i18n'

import { Field } from '../Field/Field'
import { Label } from '../Field/Label'
import { Select } from '../FinalFormComponents/Select'
import { fetchObjects } from '../../reducers/object/thunks'
import {
    getObjects,
    getObjectsError,
    getObjectsLoading,
} from '../../reducers/object/selectors'

export const OBJECT_DEFAULT_OPTIONS = []
export const OBJECT_KEY = 'objectList'
export const OBJECT_DEFAULT_VALUE = null

const objectLabel = i18n.t('Object')

const RenderComponent = ({ values }) => {
    const form = useForm()
    const dispatch = useDispatch()
    const objectType = values ? values.objectType : null

    useEffect(() => {
        if (objectType) {
            dispatch(fetchObjects(objectType)).then(({ payload }) => {
                const { objects } = payload

                if (objects.length) {
                    form.change(OBJECT_KEY, objects[0].value)
                }
            })
        }
    }, [objectType]) // eslint-disable-line react-hooks/exhaustive-deps

    return null
}

export const ObjectList = () => {
    let component
    const objects = useSelector(getObjects)
    const loading = useSelector(getObjectsLoading)
    const error = useSelector(getObjectsError)

    if (loading) {
        component = <ObjectLoading />
    } else if (error) {
        component = <ObjectError error={error} />
    } else {
        const options = [...OBJECT_DEFAULT_OPTIONS, ...objects]
        component = (
            <Field>
                <Select
                    name={OBJECT_KEY}
                    label={objectLabel}
                    options={options}
                    dataTest="input-object-list"
                />
            </Field>
        )
    }

    return (
        <>
            <FormSpy
                subscription={{ values: { objectType: true } }}
                render={({ values }) => <RenderComponent values={values} />}
            />

            {component}
        </>
    )
}

export const ObjectLoading = () => (
    <Field>
        <Label>{objectLabel}</Label>
        {i18n.t('Loading Object options...')}
    </Field>
)

export const ObjectError = ({ error }) => (
    <Field>
        <Label>{objectLabel}</Label>
        {i18n.t('Something went wrong when loading the object!')}
        <br />
        {error}
    </Field>
)
