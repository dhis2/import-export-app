import i18n from '@dhis2/d2-i18n'
import { getUploadXHR } from './xhr.js'

const trimString = (length, string) =>
    string.length > length ? string.substring(0, length - 3) + '...' : string

const pathToId = (path) => {
    const pathSplit = path.split('/')
    const orgId = pathSplit[pathSplit.length - 1]
    return orgId
}

const jsDateToISO8601 = (date) =>
    `${date.getFullYear().toString()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`

const jsDateToString = (date) =>
    `${jsDateToISO8601(date)} ${date
        .getHours()
        .toString()
        .padStart(2, 0)}:${date.getMinutes().toString().padStart(2, 0)}:${date
        .getSeconds()
        .toString()
        .padStart(2, 0)}
`
// some parameters take the long version of the compression type
const compressionToName = (compression) => {
    if (compression === 'gz') {
        return 'gzip'
    }
    return compression
}

const fileFormatToFileExtension = (format) => {
    if (format === 'adx+xml') {
        return 'xml'
    }
    return format
}

const fetchAttributes = async (apiBaseUrl, attribute) => {
    const fetcher = (url) =>
        fetch(url, { credentials: 'include' })
            .then((resp) => {
                if (resp.status >= 200 && resp.status < 300) {
                    return Promise.resolve(resp.json())
                } else {
                    throw resp
                }
            })
            .catch((resp) => {
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

    const json = await fetcher(url).catch((error) => Promise.reject(error))
    return json.attributes.map(({ id, displayName }) => ({
        value: `ATTRIBUTE:${id}`,
        label: displayName,
    }))
}

export const genericErrorMessage = i18n.t(
    'An unknown error occurred. Please try again later'
)

const errorGenerator = (setProgress) => (message) => {
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
                onResponse: (response) => {
                    const { error, id, msg, typeReports } = response
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
                            events: [{ ...msg, date: new Date() }], // this is a workaround for the initial message date coming as invalid

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
                onError: (ev) => {
                    let message
                    try {
                        const response = JSON.parse(ev.target.response)
                        message = response.message
                    } catch (e2) {
                        message = ev
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
const locationAssign = (relativeUrl) => {
    if (window.locationAssign) {
        window.locationAssign(relativeUrl)
    } else {
        try {
            const url = relativeUrl.startsWith('..')
                ? new URL(relativeUrl, document.baseURI).href
                : relativeUrl

            const urlFilePart = new URL(url).pathname.split('/').pop()
            const [, file, extension] = urlFilePart.match(/(^[^.]+)(\..+$)/)

            const downloadedFileName = `${file}${extension}`

            const link = document.createElement('a')
            link.href = url
            link.download = downloadedFileName
            link.target = '_blank'
            link.click()

            return link
        } catch (err) {
            console.error(err)
            window.open(relativeUrl, '_blank')
        }
    }
}

const getPrevJobDetails = (query, tasks) => {
    if (!query || !query.id) {
        return {}
    }

    const job = tasks[query.id]
    if (!job) {
        return {}
    }

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
