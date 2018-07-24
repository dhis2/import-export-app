import { api } from 'services'

export function getMimeType(filename) {
  if (filename.endsWith('.json')) {
    return 'application/json'
  } else if (filename.endsWith('.xml')) {
    return 'text/xml'
  }

  return null
}

export async function getMetadataAuditsAuditLog(pageNumber = 0) {
  let url = 'metadataAudits'
  if (pageNumber) {
    url += `?page=${pageNumber}`
  }

  const {
    data: { pager, metadataAudits }
  } = await api.get(url)

  return { pager, metadataAudits }
}

export function getMimeTypeFromName(name) {
  const mimeTypes = {
    json: 'application/json',
    xml: 'text/xml',
    csv: 'text/csv'
  }

  return mimeTypes[name]
}
