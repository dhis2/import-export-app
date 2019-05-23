export const SCHEMAS_SET = 'schemas/SET'
export const SCHEMAS_CLEAR = 'schemas/CLEAR'

export const setSchemas = schemas => ({ type: SCHEMAS_SET, payload: schemas })
export const clearSchemas = () => ({ type: SCHEMAS_CLEAR })
