import { getMimeType } from './mime'

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
    return async e => {
        const status = Math.floor(xhr.status / 100)
        if (xhr.readyState === 4 && status === 2) {
            const idAndMsg = extractIdAndMessage(xhr)
            onResponse({ ...idAndMsg, type: type })
        } else if (xhr.readyState !== 4 && [3, 4, 5].includes(status)) {
            onError(e)
        }
    }
}

const extractIdAndMessage = xhr => {
    const data = JSON.parse(xhr.responseText)
    const { message, status, typeReports, response } = data

    if (status && status === 'ERROR') {
        if (
            Array.isArray(typeReports) &&
            Array.isArray(typeReports[0].objectReports) &&
            Array.isArray(typeReports[0].objectReports[0].errorReports)
        ) {
            return {
                id: -1,
                msg: {
                    id: 'init',
                    text:
                        typeReports[0].objectReports[0].errorReports[0].message,
                    date: new Date(),
                },
                typeReports: data,
            }
        }
    }

    if (typeof response !== 'undefined') {
        return {
            id: response.id,
            msg: {
                id: 'init',
                text: message,
                date: new Date(response.created),
            },
        }
    }

    return { id: -1, msg: undefined }
}

const onProgress = setProgress => evt => {
    if (evt.lengthComputable) {
        const percentComplete = parseInt((evt.loaded / evt.total) * 100)
        setProgress(Math.max(1, percentComplete))
    }
}

export { getUploadXHR }
