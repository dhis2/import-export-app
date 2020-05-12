import i18n from '@dhis2/d2-i18n'

import { getUploadXHR } from './xhr'

const trimString = (length, string) =>
    string.length > length ? string.substring(0, length - 3) + '...' : string

const pathToId = path => {
    const pathSplit = path.split('/')
    const orgId = pathSplit[pathSplit.length - 1]
    return orgId
}

const jsDateToISO8601 = date =>
    `${date.getFullYear().toString()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, 0)}-${date
        .getDate()
        .toString()
        .padStart(2, 0)}`

const jsDateToString = date =>
    `${jsDateToISO8601(date)} ${date
        .getHours()
        .toString()
        .padStart(2, 0)}:${date
        .getMinutes()
        .toString()
        .padStart(2, 0)}:${date
        .getSeconds()
        .toString()
        .padStart(2, 0)}
`

const blobType = (format, compression) => {
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

const createBlob = (contents, format, compression = 'none') => {
    return URL.createObjectURL(
        new Blob([contents], { type: blobType(format, compression) })
    )
}

const downloadBlob = (url, filename) => {
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.remove()
}

const genericErrorMessage = i18n.t(
    'An unknown error occurred. Please try again later'
)

const errorGenerator = setProgress => message => {
    const timestamp = new Date().getTime()
    setProgress(0)
    return {
        id: `xhr-${timestamp}`,
        critical: true,
        message: message ? message : genericErrorMessage,
    }
}

const uploadFile = ({ url, file, format, type, setProgress, addEntry }) => {
    setProgress(1)
    const errF = errorGenerator(setProgress)

    return new Promise((resolve, reject) => {
        try {
            const xhr = getUploadXHR({
                url,
                upload: file,
                type,
                onResponse: ({ error, id, msg, typeReports }) => {
                    let entry
                    if (error && msg) {
                        // error but we have a message
                        entry = {
                            id: new Date().getTime(),
                            level: 'ERROR',
                            created: new Date(),
                            lastUpdated: new Date(),
                            completed: true,
                            events: [msg],
                            summary: typeReports,
                            error: true,
                            importType: type,
                        }
                    } else if (error) {
                        // error with no message
                        entry = {
                            id: new Date().getTime(),
                            level: 'ERROR',
                            created: new Date(),
                            lastUpdated: new Date(),
                            completed: true,
                            summary: undefined,
                            error: true,
                            importType: type,
                        }
                    } else {
                        // success
                        entry = {
                            id: id,
                            level: 'INFO',
                            created: new Date(),
                            lastUpdated: new Date(),
                            completed: false,
                            events: [msg],
                            summary: undefined,
                            error: false,
                            importType: type,
                        }
                    }
                    addEntry(entry.id, entry)

                    if (error) {
                        reject(errF(msg && msg.text))
                    }
                    setProgress(0)
                    resolve({})
                },
                onError: ev => {
                    let message
                    try {
                        const response = JSON.parse(ev.target.response)
                        message = response.message
                    } catch (e2) {
                        message = genericErrorMessage
                    }
                    console.error('sendFile error', message)
                    reject(errF(message))
                },
                setProgress,
                format,
            })
            xhr.send(file)
        } catch (e) {
            // xhr.send can throw an exception
            reject(errorGenerator(e))
        }
    })
}

// call stub function if available
const locationAssign = url => {
    if (window.locationAssign) {
        window.locationAssign(url)
    } else {
        window.location = url
    }
}

const getPrevJobDetails = (query, tasks) => {
    if (!query || !query.id) return {}

    const job = tasks[query.id]
    if (!job) return {}

    return job.jobDetails
}

export {
    createBlob,
    downloadBlob,
    getPrevJobDetails,
    locationAssign,
    jsDateToISO8601,
    jsDateToString,
    pathToId,
    trimString,
    uploadFile,
}
