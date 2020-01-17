import { api } from '../services'

export function getDownloadUrl({ format, compression, endpoint, sharing }) {
    const params = [`skipSharing=${sharing !== 'true'}`, 'download=true']
    const compressionStr =
        compression === 'none' || !compression ? '' : compression

    const url = `${endpoint}${format}${compressionStr}?${params.join('&')}`
    return api.url(url)
}
