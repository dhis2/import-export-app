import { api, eventEmitter } from '../../services'
import { isProduction } from '../../helpers/env'

const CATEGORY_2_LABEL = {
    METADATA_IMPORT: 'Metadata import',
    DATAVALUE_IMPORT: 'Data import',
    GML_IMPORT: 'GML import',
    EVENT_IMPORT: 'Event import',
}

const lastIds = {}

function emitLog(data) {
    for (let i = data.length - 1; i >= 0; i -= 1) {
        const { category, level, message, time, uid } = data[i]
        eventEmitter.emit('log', {
            id: uid,
            d: new Date(time),
            type: `${level} - ${CATEGORY_2_LABEL[category]}`,
            text: message,
        })
    }
}

export function emitLogOnFirstResponse(xhr, importType) {
    const data = JSON.parse(xhr.responseText)
    const { message, status, typeReports, response } = data

    if (status && status === 'ERROR') {
        if (
            Array.isArray(typeReports) &&
            Array.isArray(typeReports[0].objectReports) &&
            Array.isArray(typeReports[0].objectReports[0].errorReports)
        ) {
            eventEmitter.emit('log', {
                id: new Date().getTime(),
                d: new Date(),
                type: `ERROR - ${CATEGORY_2_LABEL[importType]}`,
                text: typeReports[0].objectReports[0].errorReports[0].message,
            })

            setTimeout(() => {
                eventEmitter.emit('summary.loading')
                eventEmitter.emit('summary.typeReports', typeReports)
                eventEmitter.emit('summary.loaded')
            }, 1000)

            return -1
        }
    }

    if (typeof response !== 'undefined') {
        eventEmitter.emit('log', {
            id: new Date().getTime(),
            d: new Date(response.created),
            type: `INFO - ${CATEGORY_2_LABEL[importType]}`,
            text: message,
        })

        return response.id
    }

    return -1
}

function getFetchLogPath(jobId, type) {
    let path = `system/tasks/${type}`
    if (lastIds[type]) {
        path += `?lastId=${lastIds[type]}`
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
    setTimeout(() => fetchLog(jobId, type), time)
}

export async function fetchLog(jobId, type) {
    try {
        const { data } = await api.get(getFetchLogPath(jobId, type))

        if (fetchResponseIsArray(data)) {
            lastIds[type] = data[0]['uid']
            emitLog(data, type)

            if (isFetchLogComplete(data)) {
                fetchLogAfter(jobId, type)
            }
        } else if (fetchResponseIsObject(data)) {
            let records = null
            Object.keys(data).forEach(k => {
                lastIds[type] = data[k][0]['uid']
                records = data[k]
                emitLog(data[k], type)
            })

            if (isFetchLogComplete(records)) {
                fetchLogAfter(jobId, type)
            } else {
                await fetchTaskSummary(jobId, type)
            }
        }
    } catch (e) {
        isProduction() && console.log(`Error fetching ${type}`)
        isProduction() && console.log(e)
    }
}

export async function fetchTaskSummary(jobId, type) {
    try {
        const path = `system/taskSummaries/${type}/${jobId}.json`
        const { data } = await api.get(path)

        if (data) {
            data.stats && logStats(data.stats, type)
            data.importCount && logImportCount(data.importCount, type)
            data.conflicts && logConflicts(data.conflicts, type)

            if (data.typeReports) {
                eventEmitter.emit('summary.totals', data.stats)
                eventEmitter.emit('summary.typeReports', data.typeReports)
            } else if (data.conflicts) {
                eventEmitter.emit('summary.importCount', data.importCount)
                eventEmitter.emit('summary.conflicts', data.conflicts)
            } else if (data.importSummaries) {
                eventEmitter.emit('summary.importCount', data)
                eventEmitter.emit(
                    'summary.importSummaries',
                    data.importSummaries
                )
            } else if (data.importCount) {
                eventEmitter.emit('summary.importCount', data.importCount)
            } else {
                console.error(
                    'No summary generated. Receieved data not recognized: ',
                    data
                )
            }
        }

        eventEmitter.emit('summary.loaded')
    } catch (e) {
        isProduction() && console.log(`Task Summaries: Error fetching ${type}`)
        isProduction() && console.log(e)
    }
}

function logStats(stats, type) {
    if (!stats) {
        return
    }

    const { created, updated, deleted, ignored, total } = stats
    eventEmitter.emit('log', {
        id: new Date().getTime(),
        d: null,
        type: `INFO - ${CATEGORY_2_LABEL[type]}`,
        text: `Created: ${created}, Updated: ${updated}, Deleted: ${deleted}, Ignored: ${ignored}, Total: ${total}`,
    })
}

function logImportCount(importCount, type) {
    if (!importCount) {
        return
    }

    const { deleted, ignored, imported, updated } = importCount
    eventEmitter.emit('log', {
        id: new Date().getTime(),
        d: new Date(),
        type: `INFO - ${CATEGORY_2_LABEL[type]}`,
        text: `Imported: ${imported}, Updated: ${updated}, Deleted: ${deleted}, Ignored: ${ignored}`,
    })
}

function logConflicts(conflicts, type) {
    if (!conflicts) {
        return
    }

    for (let i = 0; i < conflicts.length; i += 1) {
        const { object, value } = conflicts[i]
        eventEmitter.emit('log', {
            id: new Date().getTime(),
            d: new Date(),
            type: `CONFLICT - ${object}`,
            text: value,
        })
    }
}
