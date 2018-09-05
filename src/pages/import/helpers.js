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

function emitLog(data, type) {
  for (let i = data.length - 1; i >= 0; i -= 1) {
    const { category, level, message, time, uid } = data[i]
    eventEmitter.emit('log', {
      id: uid,
      d: new Date(time),
      text: `${message}
${category} - ${level}`
    })
  }
}

export function emitLogOnFirstResponse(xhr) {
  const { message, response } = JSON.parse(xhr.responseText)
  eventEmitter.emit('log', {
    id: new Date().getTime(),
    d: new Date(response.created),
    text: message
  })

  return response.id
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
