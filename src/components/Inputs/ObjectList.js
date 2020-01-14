import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-final-form'
import React, { useEffect, useState } from 'react'
import i18n from '@dhis2/d2-i18n'

import { Field } from '../Field/Field'
import { Label } from '../Field/Label'
import { OBJECT_TYPE_KEY } from './ObjectType'
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

const useFetchObjects = () => {
    const { subscribe, change } = useForm()
    const [objectType, setObjectType] = useState()
    const dispatch = useDispatch()

    useEffect(
        () =>
            subscribe(
                ({ values }) => {
                    const newObjectType = values[OBJECT_TYPE_KEY]
                    if (newObjectType !== objectType)
                        setObjectType(newObjectType)
                },
                { values: true }
            ),
        [subscribe, change, dispatch, objectType]
    )

    useEffect(() => {
        if (objectType) {
            dispatch(fetchObjects(objectType)).then(({ payload }) => {
                const { objects } = payload

                if (objects.length) {
                    change(OBJECT_KEY, objects[0].value)
                }
            })
        }
    }, [objectType]) // eslint-disable-line react-hooks/exhaustive-deps
}

export const ObjectList = () => {
    useFetchObjects()

    const { getState } = useForm()
    const objects = useSelector(getObjects)
    const loading = useSelector(getObjectsLoading)
    const error = useSelector(getObjectsError)
    const { objectType } = getState().values

    if (loading || !objectType) {
        return <ObjectLoading />
    } else if (error) {
        return <ObjectError error={error} />
    }

    const options = [...OBJECT_DEFAULT_OPTIONS, ...objects]
    return (
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

export const ObjectLoading = () => (
    <div data-test="input-object-list-loading">
        <Field>
            <Label>{objectLabel}</Label>
            {i18n.t('Loading Object options...')}
        </Field>
    </div>
)

export const ObjectError = ({ error }) => (
    <div data-test="input-object-list-error">
        <Field>
            <Label>{objectLabel}</Label>
            {i18n.t('Something went wrong when loading the object!')}
            <br />
            {error}
        </Field>
    </div>
)
