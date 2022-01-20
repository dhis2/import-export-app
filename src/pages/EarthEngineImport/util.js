// Rounds a number to d decimals
export const numberPrecision = d => {
    if (d === undefined) {
        return n => n
    }
    const m = Math.pow(10, d)
    return n => Math.round(n * m) / m
}

export const getPropName = (valueType = '', layerName = '') => {
    const firstWord = layerName.replace(/ .*/, '')
    return `${valueType}${firstWord}`
}
