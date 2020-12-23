import { getMimeType } from './mime'
import { eventEmitter } from '../services'
import { emitLogOnFirstResponse, fetchLog } from '../pages/import/helpers'

// eslint-disable-next-line max-params
export function getUploadXHR(url, upload, type, onResponse, onError, format) {
    const xhr = new XMLHttpRequest()
    const contentType = getMimeType(format)

    xhr.withCredentials = true
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', contentType)
    xhr.setRequestHeader(
        'Content-Disposition',
        'attachment filename="' + upload.name + '"'
    )

    xhr.onreadystatechange = onReadyStateChange(xhr, type, onResponse, onError)
    xhr.upload.onprogress = onProgress
    return xhr
}

// eslint-disable-next-line max-params
export function onReadyStateChange(xhr, type, onResponse, onError) {
    return async function handleChange(e) {
        const status = Math.floor(xhr.status / 100)
        if (xhr.readyState === 4 && status === 2) {
            eventEmitter.emit('summary.clear')

            const jobId = emitLogOnFirstResponse(xhr, type)
            if (jobId === -1) {
                onResponse()
                return
            }

            onResponse()

            eventEmitter.emit('summary.loading')
            await fetchLog(jobId, type)
        } else if ([3, 4, 5].includes(status)) {
            onError(e)
        }
    }
}

export function onProgress(evt) {
    if (evt.lengthComputable) {
        const percentComplete = parseInt((evt.loaded / evt.total) * 100)
        const stats = { ...evt, percentComplete }
        eventEmitter.emit('upload.progress', stats)
    }
}