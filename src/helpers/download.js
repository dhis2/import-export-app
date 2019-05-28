import { api } from '../services'

export function blobType(format, compression) {
    if (compression === 'gzip') {
        return `application/${format}+gzip`
    } else if (compression === 'zip') {
        return `application/${format}+zip`
    }

    if (format === 'xml') {
        return 'application/xml'
    } else if (format === 'json') {
        return 'application/json'
    }
}

export function createBlob(contents, format, compression = 'none') {
    return URL.createObjectURL(
        new Blob([contents], { type: blobType(format, compression) })
    )
}

export function downloadBlob(url, filename) {
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.remove()
}

export function getDownloadUrl({ format, compression, endpoint, sharing }) {
    const params = [`skipSharing=${sharing !== 'true'}`, 'download=true']
    const compressionStr =
        compression === 'none' || !compression ? '' : compression

    const url = `${endpoint}${format}${compressionStr}?${params.join('&')}`
    return api.url(url)
}
