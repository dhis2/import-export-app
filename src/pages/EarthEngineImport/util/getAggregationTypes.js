//TODO This function should be centralized somewhere - maybe analytics?

export const getAggregationTypes = filter => {
    const types = ['min', 'max', 'mean', 'median', 'sum', 'stdDev', 'variance']

    return filter ? types.filter(type => filter.includes(type)) : types
}
