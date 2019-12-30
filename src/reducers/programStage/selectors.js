export const getProgramStage = state => state.programStage
export const getProgramStages = state => getProgramStage(state).data
export const getProgramStagesLoading = state => getProgramStage(state).loading
export const getProgramStagesLoaded = state => getProgramStage(state).loaded
export const getProgramStagesError = state => getProgramStage(state).error
