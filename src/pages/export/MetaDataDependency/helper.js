import {
    COMPRESSION_DEFAULT_VALUE,
    COMPRESSION_KEY,
} from '../../../components/Inputs/Compression'
import {
    FORMAT_DEFAULT_VALUE,
    FORMAT_KEY,
    OPTION_JSON,
    OPTION_XML,
} from '../../../components/Inputs/Format'
import {
    OBJECT_DEFAULT_VALUE,
    OBJECT_KEY,
} from '../../../components/Inputs/ObjectList'
import {
    OBJECT_TYPE_DEFAULT_VALUE,
    OBJECT_TYPE_KEY,
} from '../../../components/Inputs/ObjectType'
import {
    SHARING_DEFAULT_VALUE,
    SHARING_KEY,
} from '../../../components/Inputs/Sharing'
import { getApi } from '../../../helpers/api'

export const supportedFormats = [OPTION_JSON, OPTION_XML]

export const initialValues = {
    [OBJECT_TYPE_KEY]: OBJECT_TYPE_DEFAULT_VALUE,
    [OBJECT_KEY]: OBJECT_DEFAULT_VALUE,
    [FORMAT_KEY]: FORMAT_DEFAULT_VALUE,
    [COMPRESSION_KEY]: COMPRESSION_DEFAULT_VALUE,
    [SHARING_KEY]: SHARING_DEFAULT_VALUE,
}

const getEndpointExtension = (format, compression) => {
    if (!compression) return format

    return `${format}.${compression}`
}

export const onSubmit = async values => {
    const { objectType, objectList, format, compression, skipSharing } = values

    const { baseUrl } = await getApi()
    const endpointSuffix = 'metadata'
    const endpoint = `${objectType}/${objectList}/${endpointSuffix}`
    const params = [`skipSharing=${skipSharing}`, 'download=true']
    const extension = getEndpointExtension(format, compression)
    const url = `${baseUrl}${endpoint}.${extension}?${params.join('&')}`

    window.location = url
}
