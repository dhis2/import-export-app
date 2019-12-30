export const LOADING_PROGRAMS_START = 'LOADING_PROGRAMS_START'
export const LOADING_PROGRAMS_ERROR = 'LOADING_PROGRAMS_ERROR'
export const SET_PROGRAMS = 'SET_PROGRAMS'

/**
 * @returns {Object}
 */
export const loadingProgramsStart = () => ({
    type: LOADING_PROGRAMS_START,
})

/**
 * @param {string} error
 * @returns {Object}
 */
export const loadingProgramsError = error => ({
    type: LOADING_PROGRAMS_ERROR,
    payload: { error },
})

/**
 * @param {Object[]} programs
 * @returns {Object}
 */
export const setPrograms = programs => ({
    type: SET_PROGRAMS,
    payload: { programs },
})
