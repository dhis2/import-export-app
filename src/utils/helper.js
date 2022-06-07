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
        .padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`

const jsDateToString = date =>
    `${jsDateToISO8601(date)} ${date
        .getHours()
        .toString()
        .padStart(2, 0)}:${date
        .getMinutes()
        .toString()
        .padStart(2, 0)}:${date.getSeconds().toString().padStart(2, 0)}
`
// some parameters take the long version of the compression type
const compressionToName = compression => {
    if (compression === 'gz') {
        return 'gzip'
    }
    return compression
}

const fileFormatToFileExtension = format => {
    if (format === 'adx+xml') {
        return 'xml'
    }
    return format
}

const fetchAttributes = async (apiBaseUrl, attribute) => {
    const fetcher = url =>
        fetch(url, { credentials: 'include' })
            .then(resp => {
                if (resp.status >= 200 && resp.status < 300) {
                    return Promise.resolve(resp.json())
                } else {
                    throw resp
                }
            })
            .catch(resp => {
                const error = new Error(resp.statusText || resp.status)
                console.error(
                    `fetchAttributes ${attribute} fetch error: `,
                    error
                )
                return Promise.reject(error)
            })

    const fields = 'id,displayName'
    const filters = `unique:eq:true&filter=${attribute}:eq:true`
    const url = `${apiBaseUrl}attributes.json?paging=false&fields=${fields}&filter=${filters}`

    const json = await fetcher(url).catch(error => Promise.reject(error))
    return json.attributes.map(({ id, displayName }) => ({
        value: `ATTRIBUTE:${id}`,
        label: displayName,
    }))
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

const uploadFile = ({
    url,
    file,
    format,
    type,
    isAsync,
    setProgress,
    addEntry,
}) => {
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
                    if (!isAsync) {
                        // we are done
                        entry = {
                            id: new Date().getTime(),
                            level: 'INFO',
                            created: new Date(),
                            lastUpdated: new Date(),
                            completed: true,
                            events: [msg],
                            summary: typeReports,
                            error: error,
                            importType: type,
                        }
                    } else if (error && msg) {
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

const downloadWindowTitle = i18n.t('Loading exported data')
const downloadWindowHtml = `
<div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center; color: rgb(33, 41, 52)">
    <p>${downloadWindowTitle}</p>
</div>
`

// call stub function if available
const locationAssign = (url, setExportEnabled) => {
    if (window.locationAssign) {
        window.locationAssign(url)
    } else {
        const downloadWindow = window.open(url, '_blank')

        downloadWindow.document.title = downloadWindowTitle
        downloadWindow.document.body.innerHTML = downloadWindowHtml // does not work in Chrome

        const enableExport = () => setExportEnabled(true)
        downloadWindow.onbeforeunload = enableExport
        downloadWindow.onabort = enableExport
        downloadWindow.onerror = enableExport
    }
}

const getPrevJobDetails = (query, tasks) => {
    if (!query || !query.id) return {}

    const job = tasks[query.id]
    if (!job) return {}

    return job.jobDetails
}

const getInitialBoolValue = (prevValue, defaultValue) => {
    if (prevValue === null || prevValue === undefined) {
        return defaultValue
    }
    return prevValue
}

export {
    fetchAttributes,
    getPrevJobDetails,
    getInitialBoolValue,
    locationAssign,
    jsDateToISO8601,
    jsDateToString,
    pathToId,
    trimString,
    uploadFile,
    compressionToName,
    fileFormatToFileExtension,
}
