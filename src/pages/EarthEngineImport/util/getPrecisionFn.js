// Returns a function that will return a value with the given precision
export const getPrecisionFn = numDecimals => {
    if (numDecimals === undefined) {
        return n => n
    }
    const m = Math.pow(10, numDecimals)
    return n => Math.round(n * m) / m
}
