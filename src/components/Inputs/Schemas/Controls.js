import { useForm } from 'react-final-form'
import { Button } from '@dhis2/ui-core'
import React, { useCallback } from 'react'
import i18n from '@dhis2/d2-i18n'
import s from '../Schemas.module.css'

const ToggleAll = ({ schemaKey, value, children, className }) => {
    const form = useForm()

    const onClick = useCallback(() => {
        const fieldKeys = Object.keys(form.getState().values[schemaKey])

        form.batch(() => {
            fieldKeys.forEach(fieldKey => {
                form.change(`${schemaKey}.${fieldKey}`, value)
            })
        })
    }, [form, value, schemaKey])

    return (
        <Button
            onClick={onClick}
            type="button"
            children={children}
            className={className}
        />
    )
}

const SelectAll = ({ schemaKey }) => (
    <ToggleAll schemaKey={schemaKey} value={true} className={s.selectAllButton}>
        {i18n.t('Select All')}
    </ToggleAll>
)

const SelectNone = ({ schemaKey }) => (
    <ToggleAll schemaKey={schemaKey} value={false}>
        {i18n.t('Select None')}
    </ToggleAll>
)

export const Controls = ({ schemaKey }) => (
    <div className={s.controls}>
        <SelectAll schemaKey={schemaKey} />
        <SelectNone schemaKey={schemaKey} />
    </div>
)
