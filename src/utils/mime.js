const mapping = {
    json: 'application/json',
    xml: 'application/xml',
    csv: 'application/csv',
    gml: 'application/xml',
    geojson: 'application/json',
    adx: 'application/adx+xml',
    pdf: 'application/pdf',
}

export const getMimeType = (format) => mapping[format] || null
