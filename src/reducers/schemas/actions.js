export const LOADING_SCHEMAS_START = 'LOADING_SCHEMAS_START'
export const LOADING_SCHEMAS_ERROR = 'LOADING_SCHEMAS_ERROR'
export const LOADING_SCHEMAS_DONE = 'LOADING_SCHEMAS_DONE'

export const loadingSchemasStart = () => ({
    type: LOADING_SCHEMAS_START,
})

export const loadingSchemasError = message => ({
    type: LOADING_SCHEMAS_ERROR,
    payload: message,
})

export const loadingSchemasDone = schemas => ({
    type: LOADING_SCHEMAS_DONE,
    payload: schemas,
})

export const setSchemas = schemas => loadingSchemasDone(schemas)
