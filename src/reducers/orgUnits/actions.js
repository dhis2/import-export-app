export const LOADING_ORG_UNITS_ROOT_START = 'LOADING_ORG_UNITS_ROOT_START'
export const LOADING_ORG_UNITS_ROOT_ERROR = 'LOADING_ORG_UNITS_ROOT_ERROR'
export const LOADING_ORG_UNITS_CHILDREN_START =
    'LOADING_ORG_UNITS_CHILDREN_START'
export const LOADING_ORG_UNITS_CHILDREN_ERROR =
    'LOADING_ORG_UNITS_CHILDREN_ERROR'
export const SET_ROOT_ORG_UNIT = 'SET_ROOT_ORG_UNIT'
export const SET_ORG_UNIT_CHILDREN = 'SET_ORG_UNIT_CHILDREN'
export const OPEN_ORG_UNIT = 'OPEN_ORG_UNIT'
export const CLOSE_ORG_UNIT = 'CLOSE_ORG_UNIT'

/**
 * @returns {Object}
 */
export const loadingOrgUnitsRootStart = () => ({
    type: LOADING_ORG_UNITS_ROOT_START,
})

/**
 * @param {string} error
 * @returns {Object}
 */
export const loadingOrgUnitsRootError = error => ({
    type: LOADING_ORG_UNITS_ROOT_ERROR,
    payload: { error },
})

/**
 * @param {string} path
 * @returns {Object}
 */
export const loadingOrgUnitsChildrenStart = path => ({
    type: LOADING_ORG_UNITS_CHILDREN_START,
    payload: { path },
})

/**
 * @param {string} error
 * @returns {Object}
 */
export const loadingOrgUnitsChildrenError = error => ({
    type: LOADING_ORG_UNITS_CHILDREN_ERROR,
    payload: { error },
})

/**
 * @param {Object} orgUnit
 * @returns {Object}
 */
export const setRootOrgUnits = orgUnit => ({
    type: SET_ROOT_ORG_UNIT,
    payload: { orgUnit },
})

/**
 * @param {string} path
 * @param {Array} children
 * @returns {Object}
 */
export const setOrgUnitChildren = (path, children) => ({
    type: SET_ORG_UNIT_CHILDREN,
    payload: { path, children },
})

/**
 * @param {string} path
 * @returns {Object}
 */
export const openOrgUnit = path => ({
    type: OPEN_ORG_UNIT,
    payload: { path },
})

/**
 * @param {string} path
 * @returns {Object}
 */
export const closeOrgUnit = path => ({
    type: CLOSE_ORG_UNIT,
    payload: { path },
})
