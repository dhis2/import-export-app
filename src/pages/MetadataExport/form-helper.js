import { locationAssign } from '../../utils/helper.js'

const onExport = (baseUrl, setExportEnabled) => (values) => {
    setExportEnabled(false)

    const { checkedSchemas, format, compression, skipSharing } = values

    // generate download url
    const apiBaseUrl = `${baseUrl}/api/`
    const endpoint = `metadata`
    const endpointExtension = compression ? `${format}.${compression}` : format
    const schemaParams = checkedSchemas.map((name) => `${name}=true`).join('&')
    const downloadUrlParams = `skipSharing=${skipSharing}&download=true&${schemaParams}`
    const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`
    locationAssign(url)
    setExportEnabled(true)

    // log for debugging purposes
    console.log('metadata-export:', { url, params: downloadUrlParams })
}

export { onExport }
