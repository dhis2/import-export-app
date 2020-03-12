import { locationAssign } from '../../utils/helper'

const onExport = baseUrl => values => {
    const { checkedSchemas, format, compression, skipSharing } = values

    // generate download url
    const apiBaseUrl = `${baseUrl}/api/`
    const endpoint = `metadata`
    const endpointExtension = compression.value
        ? `${format.value}.${compression.value}`
        : format.value
    const schemaParams = checkedSchemas.map(name => `${name}=true`).join('&')
    const downloadUrlParams = `skipSharing=${skipSharing}&download=true&${schemaParams}`
    const url = `${apiBaseUrl}${endpoint}.${endpointExtension}?${downloadUrlParams}`
    locationAssign(url)
}

export { onExport }
