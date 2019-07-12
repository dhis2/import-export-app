const mapping = {
    json: 'application/json',
    xml: 'application/xml',
    csv: 'application/csv',
    gml: 'application/xml',
    adx: 'application/adx+xml',
}

export const getMimeType = format => mapping[format] || null
