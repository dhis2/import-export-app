import { getSchemas } from '../../helpers/api'
import {
    loadingSchemasStart,
    loadingSchemasError,
    loadingSchemasDone,
} from './actions'

const filterOutExcludedSchemas = (excludedSchemas, schemas) =>
    schemas.filter(
        schema => schema.metadata && !excludedSchemas.has(schema.collectionName)
    )

const groupName = klass => {
    const group = klass.split('.')
    group.pop()

    if (!klass.includes('.dhis')) {
        group.pop()
    }

    return group[group.length - 1].replace(/(.)([A-Z])/g, '$1 $2')
}

const formatSchemas = schemas =>
    schemas.map(schema => ({
        label: schema.displayName,
        name: schema.collectionName,
        group: groupName(schema.klass),
    }))

export const fetchSchemas = excludedSchemas => dispatch => {
    dispatch(loadingSchemasStart())

    return getSchemas()
        .then(({ schemas }) => {
            const filteredSchemas = filterOutExcludedSchemas(
                excludedSchemas,
                schemas
            )
            const formattedSchemas = formatSchemas(filteredSchemas)
            const loadingSchemasDoneAction = loadingSchemasDone(
                formattedSchemas
            )

            dispatch(loadingSchemasDoneAction)
        })
        .catch(e => dispatch(loadingSchemasError(e.message)))
}
