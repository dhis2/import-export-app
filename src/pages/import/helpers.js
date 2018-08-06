import { api } from 'services'
import { eventEmitter } from 'services'

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
const typeLabel = {
  METADATA_IMPORT: 'Metadata Import',
  DATAVALUE_IMPORT: 'Data Import',
  EVENT_IMPORT: 'Event Import',
  GML_IMPORT: 'GML Import'
}

function emitLog(data, type) {
  for (let i = data.length - 1; i >= 0; i -= 1) {
    const { category, completed, level, message, time, uid } = data[i]
    eventEmitter.emit('log', {
      id: uid,
      d: new Date(time),
      subject: typeLabel[type],
      text: `Completed: ${completed}
Level: ${level}
Category: ${category}
Message:
${message}`
    })
  }
}

export async function fetchLog(type) {
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
        setTimeout(() => fetchLog(type), 2000)
      }
    } else if (typeof data === 'object') {
      let records = null
      Object.keys(data).forEach(k => {
        lastIds[type] = data[k][0]['uid']
        records = data[k]
        emitLog(data[k], type)
      })

      if (records.filter(item => item.completed).length === 0) {
        setTimeout(() => fetchLog(type), 2000)
      }
    }
  } catch (e) {
    console.log(`Error fetching ${type}`)
  }
}
