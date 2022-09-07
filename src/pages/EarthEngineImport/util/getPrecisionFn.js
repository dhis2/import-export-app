// Returns a function that will return a value with the given precision
const getPrecisionFn = (numDecimals) => {
    const decimals = parseInt(numDecimals)
    if (decimals === -1) {
        return (n) => n
    }
    const m = Math.pow(10, decimals)
    return (n) => Math.round(n * m) / m
}

export { getPrecisionFn }
