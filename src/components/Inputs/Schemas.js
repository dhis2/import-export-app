import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import propTypes from 'prop-types'

import { Controls } from './Schemas/Controls'
import { Loading } from '../Loading'
import { SchemaGroup } from './Schemas/SchemaGroup'
import { fetchSchemas } from '../../reducers/schemas/thunks'
import {
    getGroupLabels,
    getGroupOrder,
    getSchemaGroups,
} from '../../reducers/schemas/selectors'
import s from './Schemas.module.css'

const SCHEMAS_KEY = 'schemas'

export const Schemas = ({ excludeSchemas }) => {
    const dispatch = useDispatch()
    const schemasLoaded = useSelector(state => state.schemas.loaded)
    const schemasLoading = useSelector(state => state.schemas.loading)
    const schemaGroups = useSelector(getSchemaGroups)
    const schemaGroupLabels = useSelector(getGroupLabels)
    const schemaGroupOrder = useSelector(getGroupOrder)

    useEffect(() => {
        if (!schemasLoading && !schemasLoaded) {
            dispatch(fetchSchemas(excludeSchemas))
        }
    }, [schemasLoading, schemasLoaded, excludeSchemas, dispatch])

    if (!schemasLoaded || schemasLoading) return <Loading />

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

Schemas.propTypes = {
    excludeSchemas: propTypes.instanceOf(Set),
}

Schemas.defaultProps = {
    excludeSchemas: new Set([]),
}
