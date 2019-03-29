export const SCHEMAS_SET = 'schemas/SET'
export const SCHEMAS_CLEAR = 'schemas/CLEAR'

export const setSchemas = user => ({ type: SCHEMAS_SET, payload: user })
export const clearSchemas = () => ({ type: SCHEMAS_CLEAR })
