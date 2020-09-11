import { locationAssign } from '../../utils/helper'

const onExport = (baseUrl, setExportEnabled) => values => {
    setExportEnabled(false)

    const { objectType, object, format, compression, skipSharing } = values

    const apiBaseUrl = `${baseUrl}/api/`
    const endpoint = `${objectType}/${object}/metadata`
    const endpointExtension = compression ? `${format}.${compression}` : format
    const downloadUrlParams = `skipSharing=${skipSharing}&download=true`
    const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`

    setTimeout(() => setExportEnabled(true), 5000)
    locationAssign(url)
}

export { onExport }
