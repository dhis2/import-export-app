export const getObject = state => state.object
export const getObjects = state => getObject(state).data
export const getObjectsLoading = state => getObject(state).loading
export const getObjectsLoaded = state => getObject(state).loaded
export const getObjectsError = state => getObject(state).error
