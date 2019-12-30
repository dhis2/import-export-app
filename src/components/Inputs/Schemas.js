import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import propTypes from 'prop-types'

import { Loading } from '../Loading'
import { fetchSchemas } from '../../reducers/schemas/thunks'
import {
    getGroupLabels,
    getGroupOrder,
    getSchemaGroups,
} from '../../reducers/schemas/selectors'
import { Controls } from './Schemas/Controls'
import { SchemaGroup } from './Schemas/SchemaGroup'
import s from './Schemas.module.css'

const SCHEMAS_KEY = 'schemas'

const SchemasInput = ({
    excludeSchemas,
    schemasLoading,
    schemasLoaded,
    schemaGroups,
    schemaGroupLabels,
    schemaGroupOrder,
    fetchSchemas,
}) => {
    useEffect(() => {
        if (!schemasLoading && !schemasLoaded) {
            fetchSchemas(excludeSchemas)
        }
    }, [schemasLoading, schemasLoaded, fetchSchemas, excludeSchemas])

    if (!schemasLoaded || schemasLoading) {
        return <Loading />
    }

    return (
        <div className={s.container} data-test="input-schemas">
            <Controls schemaKey={SCHEMAS_KEY} />

            <div className={s.formControl}>
                {schemaGroupOrder.map(groupKey => {
                    const label = schemaGroupLabels[groupKey]

                    return (
                        <SchemaGroup
                            key={label}
                            label={label}
                            schemas={schemaGroups[groupKey]}
                            value="true"
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
        schemaGroupLabels: getGroupLabels(state),
        schemaGroupOrder: getGroupOrder(state),
    }),
    { fetchSchemas }
)(SchemasInput)
