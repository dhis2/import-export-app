import { api, eventEmitter } from '../../services'
import { debug } from '../../helpers/debug';

const debugImportHelper = debug.extend('import-helper')
const debugLog = debugImportHelper.extend('log')
const debugFetch = debugImportHelper.extend('fetch')

const CATEGORY_2_LABEL = {
    METADATA_IMPORT: 'Metadata import',
    DATAVALUE_IMPORT: 'Data import',
    GML_IMPORT: 'GML import',
    EVENT_IMPORT: 'Event import',
}

const debugLastId = debugLog.extend('last-id')
const lastIds = {}

const setLastId = (type, payload) => {
    debugLastId('Last ids: set %s, data: %O', type, payload)
    lastIds[type] = payload
}

const getLastId = type => {
    debugLastId('Last ids: get %s, data: %O', type, lastIds[type])
    return lastIds[type]
}

const debugEmit = debugLog.extend('emit')
function emitLog(data) {
    for (let i = data.length - 1; i >= 0; i -= 1) {
        const { category, level, message, time, uid } = data[i]
        const emitData = {
            id: uid,
            d: new Date(time),
            type: `${level} - ${CATEGORY_2_LABEL[category]}`,
            text: message,
        }

        debugEmit(`Emit log, data: %O`, emitData)
        eventEmitter.emit('log', emitData)
    }
}

const debugFirstResponse = debugLog.extend('on-first-response')
export function emitLogOnFirstResponse(xhr, importType) {
    const data = JSON.parse(xhr.responseText)
    const { message, status, typeReports, response } = data

    if (status && status === 'ERROR') {
        if (
            Array.isArray(typeReports) &&
            Array.isArray(typeReports[0].objectReports) &&
            Array.isArray(typeReports[0].objectReports[0].errorReports)
        ) {
            const emitErrorData = {
                id: new Date().getTime(),
                d: new Date(),
                type: `ERROR - ${CATEGORY_2_LABEL[importType]}`,
                text: typeReports[0].objectReports[0].errorReports[0].message,
            }

            debugFirstResponse(`Emit log (first response), error: %O`, emitErrorData)
            eventEmitter.emit('log', emitErrorData)

            setTimeout(() => {
                eventEmitter.emit('summary.loading')
                eventEmitter.emit('summary.typeReports', typeReports)
                eventEmitter.emit('summary.loaded')
            }, 1000)

            return -1
        }
    }

    if (typeof response !== 'undefined') {
        const emitLogData = {
            id: new Date().getTime(),
            d: new Date(response.created),
            type: `INFO - ${CATEGORY_2_LABEL[importType]}`,
            text: message,
        }

        debugFirstResponse(`Emit log, data: %O`, emitLogData)
        eventEmitter.emit('log', emitLogData)

        return response.id
    }

    debugFirstResponse(`Emit log, error: Response not defined`)
    return -1
}

function getFetchLogPath(jobId, type) {
    let path = `system/tasks/${type}`

    const lastId = getLastId(type)
    if (lastId) {
        path += `?lastId=${lastId}`
    }

    return path
}

function fetchResponseIsArray(data) {
    return Array.isArray(data) && data.length > 0
}

function fetchResponseIsObject(data) {
    return typeof data === 'object'
}

function isFetchLogComplete(data) {
    if (!data) {
        return false
    }

    return data.filter(item => item.completed).length === 0
}

function fetchLogAfter(jobId, type, time = 2000) {
    debugImportHelper(`Emit log, after complete: Response not defined`)
    setTimeout(() => fetchLog(jobId, type), time)
}

const debugFetchLog = debugFetch.extend('log')
export async function fetchLog(jobId, type) {
    debugFetchLog(`Fetch log, jobId: %s, type: %s`, jobId, type)

    try {
        const { data } = await api.get(getFetchLogPath(jobId, type))

        if (fetchResponseIsArray(data)) {
            debugFetchLog(`Fetch log, response (array): %O`, data)

            setLastId(type, data[0]['uid'])
            emitLog(data, type)

            if (isFetchLogComplete(data)) {
                debugFetchLog(`Fetch log, is complete: Yes`)
                fetchLogAfter(jobId, type)
            } else {
                debugFetchLog(`Fetch log, is complete: No`)
                await fetchTaskSummary(jobId, type)
            }
        } else if (fetchResponseIsObject(data)) {
            debugFetchLog(`Fetch log, response (object): %O`, data)

            let records = null
            Object.keys(data).forEach(k => {
                setLastId(type, data[k][0]['uid'])
                records = data[k]
                emitLog(data[k], type)
            })

            if (isFetchLogComplete(records)) {
                debugFetchLog(`Fetch log, is complete: Yes`)
                fetchLogAfter(jobId, type)
            } else {
                debugFetchLog(`Fetch log, is complete: No`)
                await fetchTaskSummary(jobId, type)
            }
        }
    } catch (e) {
        debugFetchLog(`Fetch log, error %s: %O`, type, e)
    }
}

const debugFetchTaskSummary = debugFetch.extend('task-summary')
export async function fetchTaskSummary(jobId, type) {
    try {
        debugFetchTaskSummary(`Fetch task summary start, jobId: %s, type: %s`, jobId, type)

        const path = `system/taskSummaries/${type}/${jobId}.json`
        const { data } = await api.get(path)

        if (data) {
            debugFetchTaskSummary(`Fetch task summary response, :O`, data)

            data.stats && logStats(data.stats, type)
            data.importCount && logImportCount(data.importCount, type)
            data.conflicts && logConflicts(data.conflicts, type)

            if (data.typeReports) {
                debugFetchTaskSummary(`Fetch task summary, has "typeReports"`)
                eventEmitter.emit('summary.totals', data.stats)
                eventEmitter.emit('summary.typeReports', data.typeReports)
            } else if (data.conflicts) {
                debugFetchTaskSummary(`Fetch task summary, has "conflicts"`)
                eventEmitter.emit('summary.importCount', data.importCount)
                eventEmitter.emit('summary.conflicts', data.conflicts)
            } else if (data.importSummaries) {
                debugFetchTaskSummary(`Fetch task summary, has "importsSummaries"`)
                eventEmitter.emit('summary.importCount', data)
                eventEmitter.emit(
                    'summary.importSummaries',
                    data.importSummaries
                )
            } else if (data.importCount) {
                debugFetchTaskSummary(`Fetch task summary, has "importCount"`)
                eventEmitter.emit('summary.importCount', data.importCount)
            } else {
                debugFetchTaskSummary(`Fetch task summary, error, data: %O`, data)
            }
        }

        throw new Error(`No summary could be loaded, data is: ${data}`)
    } catch (e) {
        debugFetchTaskSummary(`Fetch task summary, fetching error for %s(%s): %s`, jobId, type, e.message)
    }

    eventEmitter.emit('summary.loaded')
}

const debugLogStats = debugLog.extend('stats')
function logStats(stats, type) {
    if (!stats) {
        debugLogStats(`Log stats, no data received`)
        return
    }

    const { created, updated, deleted, ignored, total } = stats
    const logData = {
        id: new Date().getTime(),
        d: null,
        type: `INFO - ${CATEGORY_2_LABEL[type]}`,
        text: `Created: ${created}, Updated: ${updated}, Deleted: ${deleted}, Ignored: ${ignored}, Total: ${total}`,
    }

    debugLogStats(`Log stats: %O`, logData)
    eventEmitter.emit('log', logData)
}

const debugLogCount = debugLog.extend('stats')
function logImportCount(importCount, type) {
    if (!importCount) {
        debugLogCount(`Log import count, no data received`)
        return
    }

    const { deleted, ignored, imported, updated } = importCount
    const logData = {
        id: new Date().getTime(),
        d: new Date(),
        type: `INFO - ${CATEGORY_2_LABEL[type]}`,
        text: `Imported: ${imported}, Updated: ${updated}, Deleted: ${deleted}, Ignored: ${ignored}`,
    }

    debugLogCount(`Log import count: %O`, logData)
    eventEmitter.emit('log', logData)
}

const debugLogConflicts = debugLog.extend('stats')
function logConflicts(conflicts, type) {
    if (!conflicts) {
        debugLogConflicts(`Log conflicts, no data received`)
        return
    }

    for (let i = 0; i < conflicts.length; i += 1) {
        const { object, value } = conflicts[i]
        const logData = {
            id: new Date().getTime(),
            d: new Date(),
            type: `CONFLICT - ${object}`,
            text: value,
        }

        debugLogConflicts(`Log conflict: %O`, logData)
        eventEmitter.emit('log', logData)
    }
}
