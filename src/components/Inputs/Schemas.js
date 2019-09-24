import { Button } from '@dhis2/ui-core'
import { connect } from 'react-redux'
import { useForm } from 'react-final-form'
import React, { useEffect, useCallback } from 'react'
import i18n from '@dhis2/d2-i18n'
import propTypes from 'prop-types'

import { Checkbox } from '../FinalFormComponents/Checkbox'
import { fetchSchemas } from '../../reducers/schemas/thunks'
import {
    getGroupLables,
    getGroupOrder,
    getSchemaGroups,
} from '../../reducers/schemas/selectors'
import s from '../Form/Schemas/styles.module.css'

const SCHEMAS_KEY = 'schemas'

const ToggleAll = ({ schemaKey, value, children }) => {
    const form = useForm()

    const onClick = useCallback(() => {
        const fieldKeys = Object.keys(form.getState().values[schemaKey])

        form.batch(() => {
            fieldKeys.forEach(fieldKey => {
                form.change(`${schemaKey}.${fieldKey}`, value)
            })
        })
    }, [form, value, schemaKey])

    return <Button onClick={onClick} type="button" children={children} />
}

const SelectAll = ({ schemaKey }) => (
    <ToggleAll schemaKey={schemaKey} value={true}>
        {i18n.t('Select All')}
    </ToggleAll>
)

const SelectNone = ({ schemaKey }) => (
    <ToggleAll schemaKey={schemaKey} value={false}>
        {i18n.t('Select None')}
    </ToggleAll>
)

const Controls = ({ schemaKey }) => (
    <div className={s.controls}>
        <SelectAll schemaKey={schemaKey} />
        <SelectNone schemaKey={schemaKey} />
    </div>
)

const SchemaGroup = ({ label, schemas }) => (
    <div className={s.group}>
        <span className={s.formLabel}>{label}</span>
        <div className={s.schema}>
            {schemas.map(schema => (
                <div key={schema.name}>
                    <Checkbox
                        label={schema.label}
                        name={`schemas.${schema.name}`}
                        checkedInitially
                    />
                </div>
            ))}
        </div>
    </div>
)

const SchemasInput = ({
    excludeSchemas,

    schemasLoading,
    schemasLoaded,
    schemaGroups,
    schemaGroupLables,
    schemaGroupOrder,
    fetchSchemas,
}) => {
    useEffect(() => {
        !schemasLoaded && fetchSchemas(excludeSchemas)
    }, [schemasLoaded, fetchSchemas, excludeSchemas])

    if (!schemasLoaded || schemasLoading) {
        return 'Schemas loading...'
    }

    return (
        <div className={s.container}>
            <Controls schemaKey={SCHEMAS_KEY} />

            <div className={s.formControl}>
                {schemaGroupOrder.map(groupKey => {
                    const label = schemaGroupLables[groupKey]

                    return (
                        <SchemaGroup
                            key={label}
                            label={label}
                            schemas={schemaGroups[groupKey]}
                        />
                    )
                })}
            </div>
        </div>
    )
}

SchemasInput.propTypes = {
    excludeSchemas: propTypes.instanceOf(Set),
}

SchemasInput.defaultProps = {
    excludeSchemas: new Set([]),
}

export const Schemas = connect(
    state => ({
        schemasLoaded: state.schemas.loaded,
        schemasLoading: state.schemas.loading,
        schemaGroups: getSchemaGroups(state),
        schemaGroupLables: getGroupLables(state),
        schemaGroupOrder: getGroupOrder(state),
    }),
    { fetchSchemas }
)(SchemasInput)
