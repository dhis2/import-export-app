import { debug } from './debug';
import { emitLogOnFirstResponse, fetchLog } from '../pages/import/helpers'
import { eventEmitter } from '../services'
import { getMimeType } from './mime'

const debugHelperXhr = debug.extend('helper:xhr')

// eslint-disable-next-line max-params
const debugCreateXhr = debugHelperXhr.extend('create-xhr')
export function getUploadXHR(url, upload, type, onResponse, onError, format) {
    debugCreateXhr('Upload start, url: %s, type: %s', url, type)
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
const debugReadyStateChange = debugHelperXhr.extend('ready-state')
export function onReadyStateChange(xhr, type, onResponse, onError) {
    return async function handleChange(e) {
        const status = Math.floor(xhr.status / 100)

        if (xhr.readyState === 4 && status === 2) {
            debugReadyStateChange('Upload ready state change, finished')
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
            debugReadyStateChange('Upload ready state change, errored', xhr.status)
            onError(e)
        } else {
            debugReadyStateChange('Upload ready state change, ready state: %d, status: %d', xhr.readyState, xhr.status)
        }
    }
}

const debugProgress = debugHelperXhr.extend('upload-progress')
export function onProgress(evt) {
    if (evt.lengthComputable) {
        const percentComplete = parseInt((evt.loaded / evt.total) * 100)
        const stats = { ...evt, percentComplete }

        debugProgress('Upload progress, percent: %d', percentComplete)
        eventEmitter.emit('upload.progress', stats)
    }
}
