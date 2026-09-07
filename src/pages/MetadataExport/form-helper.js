import { fetchAndDownload } from '../../utils/helper.js'

const onExport = (baseUrl, setExportEnabled) => async (values) => {
    setExportEnabled(false)

    const {
        checkedSchemas,
        format,
        compression,
        skipSharing,
        inclusionStrategy,
    } = values

    // generate download url
    const apiBaseUrl = `${baseUrl}/api/`
    const endpoint = `metadata`
    const endpointExtension = compression ? `${format}.${compression}` : format
    const schemaParams = checkedSchemas.map((name) => `${name}=true`).join('&')
    const downloadUrlParams = `skipSharing=${skipSharing}&inclusionStrategy=${inclusionStrategy}&download=true&${schemaParams}`
    const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`

    try {
        return await fetchAndDownload(url, 'metadata')
    } finally {
        setExportEnabled(true)

        // log for debugging purposes
        console.log('metadata-export:', { url, params: downloadUrlParams })
    }
}

export { onExport }
