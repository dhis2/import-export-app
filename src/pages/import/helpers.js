import { api } from 'services'
import { eventEmitter } from 'services'

const CATEGORY_2_LABEL = {
  METADATA_IMPORT: 'Metadata import',
  DATAVALUE_IMPORT: 'Data import',
  GML_IMPORT: 'GML import',
  EVENT_IMPORT: 'Event import'
}

export function getMimeType(filename) {
  if (filename.endsWith('json')) {
    return 'application/json'
  } else if (filename.endsWith('xml')) {
    return 'application/xml'
  } else if (filename.endsWith('csv')) {
    return 'application/csv'
  } else if (filename.endsWith('gml')) {
    return 'application/xml'
  }

  return null
}

const lastIds = {}

function emitLog(data) {
  for (let i = data.length - 1; i >= 0; i -= 1) {
    const { category, level, message, time, uid } = data[i]
    eventEmitter.emit('log', {
      id: uid,
      d: new Date(time),
      type: `${level} - ${CATEGORY_2_LABEL[category]}`,
      text: message
    })
  }
}

export function emitLogOnFirstResponse(xhr, importType) {
  const { message, response } = JSON.parse(xhr.responseText)
  eventEmitter.emit('log', {
    id: new Date().getTime(),
    d: new Date(response.created),
    type: `INFO - ${CATEGORY_2_LABEL[importType]}`,
    text: message
  })

  return response.id
}

export async function fetchLog(jobId, type) {
  try {
    let path = `system/tasks/${type}`
    if (lastIds[type]) {
      path += `?lastId=${lastIds[type]}`
    }
    const { data } = await api.get(path)

    if (Array.isArray(data) && data.length > 0) {
      lastIds[type] = data[0]['uid']
      emitLog(data, type)
      eventEmitter.emit('log.open')

      if (data.filter(item => item.completed).length === 0) {
        setTimeout(() => fetchLog(jobId, type), 2000)
      }
    } else if (typeof data === 'object') {
      let records = null
      Object.keys(data).forEach(k => {
        lastIds[type] = data[k][0]['uid']
        records = data[k]
        emitLog(data[k], type)
      })

      if (records.filter(item => item.completed).length === 0) {
        setTimeout(() => fetchLog(jobId, type), 2000)
      } else if (jobId.length > 0) {
        await fetchTaskSummary(jobId, type)
      }
    }
  } catch (e) {
    console.log(`Error fetching ${type}`)
  }
}

export async function fetchTaskSummary(jobId, type) {
  try {
    const path = `system/taskSummaries/${type}/${jobId}.json`
    const { data } = await api.get(path)
    const {
      stats: { created, updated, deleted, ignored, total }
    } = data

    eventEmitter.emit('log', {
      id: new Date().getTime(),
      d: new Date(),
      type: `INFO - ${CATEGORY_2_LABEL[type]}`,
      text: `Created: ${created}, Updated: ${updated}, Deleted: ${deleted}, Ignored: ${ignored}, Total: ${total}`
    })
  } catch (e) {
    console.log(`Task Summaries: Error fetching ${type}`)
  }
}
