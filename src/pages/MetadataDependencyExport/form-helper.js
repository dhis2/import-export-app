import { locationAssign } from '../../utils/helper'

const onExport = baseUrl => values => {
    const { objectType, object, format, compression, skipSharing } = values

    const apiBaseUrl = `${baseUrl}/api/`
    const endpoint = `${objectType}/${object}/metadata`
    const endpointExtension = compression.value
        ? `${format.value}.${compression.value}`
        : format.value
    const downloadUrlParams = `skipSharing=${skipSharing}&download=true`
    const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`
    locationAssign(url)
}

export { onExport }
