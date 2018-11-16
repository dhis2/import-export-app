export function getMimeType(filename) {
    if (filename.endsWith('json') || filename.includes('.json')) {
        return 'application/json'
    } else if (filename.endsWith('xml') || filename.includes('.xml')) {
        return 'application/xml'
    } else if (filename.endsWith('csv') || filename.includes('.csv')) {
        return 'application/csv'
    } else if (filename.endsWith('gml') || filename.includes('.gml')) {
        return 'application/xml'
    }

    return null
}
