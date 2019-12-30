import { createSelector } from 'reselect'

export const getDataSets = state => state.dataSets

export const getDataSetsLoading = state => getDataSets(state).loading

export const getDataSetsLoaded = state => getDataSets(state).loaded

export const getDataSetsError = state => getDataSets(state).error

export const getDataSetsData = state => getDataSets(state).data

export const getDataSetsFilter = state => getDataSets(state).filter

export const getFilteredDataSets = createSelector(
    [getDataSetsData, getDataSetsFilter],
    (data, filter) => {
        const formattedFilter = filter.toLowerCase()

        return data.filter(set =>
            set.label.toLowerCase().includes(formattedFilter)
        )
    }
)
