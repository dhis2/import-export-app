import { getMimeType } from './mime.js'

const getUploadXHR = ({
    url,
    upload,
    type,
    onResponse,
    onError,
    setProgress,
    format,
}) => {
    const xhr = new XMLHttpRequest()
    const contentType = getMimeType(format)

    xhr.withCredentials = true
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', contentType)
    xhr.setRequestHeader(
        'Content-Disposition',
        'attachment filename="' + upload.name + '"'
    )

    xhr.onreadystatechange = onReadyStateChange({
        xhr,
        type,
        onResponse,
        onError,
    })
    xhr.upload.onprogress = onProgress(setProgress)
    return xhr
}

const onReadyStateChange = ({ xhr, type, onResponse, onError }) => {
    return (e) => {
        const status = Math.floor(xhr.status / 100)
        if (xhr.readyState === 4 && status === 2) {
            const data = JSON.parse(xhr.responseText)
            const idAndMsg = extractIdAndMessage(data)
            onResponse({ ...idAndMsg, type: type })
        } else if (xhr.readyState === 4) {
            onError(e)
        }
    }
}

export const extractIdAndMessage = (data) => {
    const { message, status, typeReports, response } = data

    if (status && status === 'ERROR') {
        if (
            Array.isArray(typeReports) &&
            Array.isArray(typeReports[0].objectReports) &&
            Array.isArray(typeReports[0].objectReports[0].errorReports)
        ) {
            return {
                error: true,
                msg: {
                    id: 'init',
                    text: typeReports[0].objectReports[0].errorReports[0]
                        .message,
                    date: new Date(),
                },
                typeReports: data,
            }
        }
    }

    if (typeof response !== 'undefined') {
        if (response.id) {
            // the response will contain an `id` if the import was asynchronous
            return {
                id: response.id,
                msg: {
                    id: 'init',
                    text: message,
                    date: new Date(response.created),
                },
            }
        } else {
            // the response will contain a report inside the response if the
            // import was synchronous
            return {
                msg: {
                    id: 'completed',
                    text: 'Import:Done',
                    date: new Date(),
                },
                typeReports: response,
            }
        }
    }

    // sync metadata import
    if (typeReports) {
        if (
            Array.isArray(typeReports) &&
            typeReports[0] &&
            Array.isArray(typeReports[0].objectReports) &&
            typeReports[0].objectReports[0] &&
            Array.isArray(typeReports[0].objectReports[0].errorReports)
        ) {
            return {
                error: true,
                msg: {
                    id: 'init',
                    text: typeReports[0].objectReports[0].errorReports[0]
                        .message,
                    date: new Date(),
                },
                typeReports: data,
            }
        }

        return {
            msg: {
                id: 'completed',
                text: 'Import:Done',
                date: new Date(),
            },
            typeReports: data,
        }
    }

    return { error: true }
}

const onProgress = (setProgress) => (evt) => {
    if (evt.lengthComputable) {
        const percentComplete = parseInt((evt.loaded / evt.total) * 100)
        setProgress(Math.max(1, percentComplete))
    }
}

export { getUploadXHR }
