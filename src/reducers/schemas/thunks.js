import { get, filter, map, pipe } from 'lodash/fp'
import { getSchemas } from '../../helpers/api'
import {
    loadingSchemasStart,
    loadingSchemasError,
    loadingSchemasDone,
} from './actions'

const filterOutExcludedSchemas = excludedSchemas =>
    filter(
        schema => schema.metadata && !excludedSchemas.has(schema.collectionName)
    )

const groupName = klass => {
    const group = klass.split('.')
    group.pop()

    if (!klass.includes('.dhis')) {
        group.pop()
    }

    return group[group.length - 1]
}

const formatSchemas = map(schema => ({
    name: schema.name,
    klass: schema.klass,
    displayName: schema.displayName,
    collectionName: schema.collectionName,
    group: groupName(schema.klass),
}))

export const fetchSchemas = excludedSchemas => dispatch => {
    dispatch(loadingSchemasStart())

    return getSchemas()
        .then(
            pipe(
                get('schemas'),
                filterOutExcludedSchemas(excludedSchemas),
                formatSchemas,
                loadingSchemasDone,
                dispatch
            )
        )
        .catch(e => dispatch(loadingSchemasError(e.message)))
}
