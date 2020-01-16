import { isProduction } from './env'

const assign = url => (window.location.url = url)
if (!isProduction) {
    window.assign = assign
}

export const download = url =>
    !isProduction ? window.assign(url) : assign(url)
