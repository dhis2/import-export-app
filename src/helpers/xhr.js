import { getMimeType } from './mime'

export function getUploadXHR(url, upload) {
    const xhr = new XMLHttpRequest()
    const contentType = getMimeType(upload.name.toLowerCase())

    xhr.withCredentials = true
    xhr.setRequestHeader('Content-Type', contentType)
    xhr.setRequestHeader(
        'Content-Disposition',
        'attachment filename="' + upload.name + '"'
    )

    xhr.open('POST', url, true)
    return xhr
}
