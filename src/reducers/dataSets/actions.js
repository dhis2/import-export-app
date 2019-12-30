export const LOADING_DATA_SETS_START = 'LOADING_DATA_SETS_START'
export const LOADING_DATA_SETS_ERROR = 'LOADING_DATA_SETS_ERROR'
export const LOADING_DATA_SETS_DONE = 'LOADING_DATA_SETS_DONE'
export const SET_DATA_SETS_FILTER = 'SET_DATA_SETS_FILTER'

export const loadingDataSetsStart = () => ({
    type: LOADING_DATA_SETS_START,
})

export const loadingDataSetsError = error => ({
    type: LOADING_DATA_SETS_ERROR,
    payload: { error },
})

export const loadingDataSetsDone = dataSets => ({
    type: LOADING_DATA_SETS_DONE,
    payload: { dataSets },
})

export const setDataSetsFilter = filter => ({
    type: SET_DATA_SETS_FILTER,
    payload: { filter },
})
