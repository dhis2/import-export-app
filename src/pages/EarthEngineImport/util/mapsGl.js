export const defaultEarthEngineOptions = {
    bandReducer: 'sum',
    popup: '{name}: {value} {unit}',
    nullPopup: '{name}: {noValue}',
    noValue: 'no value',
}

const workerOptions = [
    'format',
    'aggregationType',
    'band',
    'bandReducer',
    'buffer',
    'data',
    'datasetId',
    'filter',
    'legend',
    'mask',
    'methods',
    'mosaic',
    'params',
]

// Returns the layer options that should be passed to the EE worker
export const getEarthEngineOptions = opts => {
    const options = Object.keys(opts)
        .filter(option => workerOptions.includes(option))
        .reduce((obj, key) => {
            obj[key] = opts[key]
            return obj
        }, {})

    // Exclude point features if no buffer
    if (options.data && !options.buffer) {
        options.data = options.data.filter(d => d.geometry.type !== 'Point')
    }

    return options
}
