export function getMimeType(filename) {
    const isJSON = filename.endsWith('json') || filename.includes('.json')
    const isXML = filename.endsWith('xml') || filename.includes('.xml')
    const isCSV = filename.endsWith('csv') || filename.includes('.csv')
    const isGML = filename.endsWith('gml') || filename.includes('.gml')

    if (isJSON) {
        return 'application/json'
    } else if (isXML) {
        return 'application/xml'
    } else if (isCSV) {
        return 'application/csv'
    } else if (isGML) {
        return 'application/xml'
    }

    return null
}
