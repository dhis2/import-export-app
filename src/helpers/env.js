export const isProduction = process.env.NODE_ENV === 'production'

export const getIsProduction = () => {
    return isProduction
}
