export const LOADING_PROGRAM_STAGES_START = 'LOADING_PROGRAM_STAGES_START'
export const LOADING_PROGRAM_STAGES_ERROR = 'LOADING_PROGRAM_STAGES_ERROR'
export const SET_PROGRAM_STAGES = 'SET_PROGRAM_STAGES'

/**
 * @returns {Object}
 */
export const loadingProgramStagesStart = () => ({
    type: LOADING_PROGRAM_STAGES_START,
})

/**
 * @param {string} error
 * @returns {Object}
 */
export const loadingProgramStagesError = error => ({
    type: LOADING_PROGRAM_STAGES_ERROR,
    payload: { error },
})

/**
 * @param {Object[]} programs
 * @returns {Object}
 */
export const setProgramStages = programStages => ({
    type: SET_PROGRAM_STAGES,
    payload: { programStages },
})
