import { fetchAndDownload } from '../../utils/helper.js'

const onExport = (baseUrl, setExportEnabled) => async (values) => {
    setExportEnabled(false)

    const { objectType, object, format, compression, skipSharing } = values

    const apiBaseUrl = `${baseUrl}/api/`
    const endpoint = `${objectType}/${object}/metadata`
    const endpointExtension = compression ? `${format}.${compression}` : format
    const downloadUrlParams = `skipSharing=${skipSharing}&download=true`
    const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`

    try {
        return await fetchAndDownload(url, 'metadata-dependency')
    } finally {
        setExportEnabled(true)

        console.log('metadata-dependency-export:', {
            url,
            params: downloadUrlParams,
        })
    }
}

export { onExport }
