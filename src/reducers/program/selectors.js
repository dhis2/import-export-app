export const getProgram = state => state.program
export const getPrograms = state => getProgram(state).data
export const getProgramsLoading = state => getProgram(state).loading
export const getProgramsLoaded = state => getProgram(state).loaded
export const getProgramsError = state => getProgram(state).error
