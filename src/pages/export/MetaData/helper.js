import {
    COMPRESSION_DEFAULT_VALUE,
    COMPRESSION_KEY,
} from '../../../components/Inputs/Compression'
import {
    FORMAT_DEFAULT_VALUE,
    FORMAT_KEY,
    OPTION_CSV,
    OPTION_JSON,
    OPTION_XML,
} from '../../../components/Inputs/Format'
import {
    SHARING_DEFAULT_VALUE,
    SHARING_KEY,
} from '../../../components/Inputs/Sharing'
import { download } from '../../../helpers/url'
import { getApi } from '../../../helpers/api'

export const EXCLUDE_SCHEMAS = new Set([
    'analyticsTableHooks',
    'charts',
    'constants',
    'dataElementDimensions',
    'dataEntryForms',
    'dataSetNotificationTemplates',
    'dataStores',
    'documents',
    'eventCharts',
    'eventReports',
    'icons',
    'jobConfigurations',
    'messageConversations',
    'metadataVersions',
    'minMaxDataElements',
    'oAuth2Clients',
    'programDataElements',
    'programNotificationTemplates',
    'pushAnalysis',
    'reportTables',
    'reportingRates',
    'reports',
    'sections',
    'smsCommands',
    'sqlViews',
    'trackedEntityInstanceFilters',
    'validationNotificationTemplates',
])

export const supportedFormats = [OPTION_JSON, OPTION_XML, OPTION_CSV]

export const initialValues = {
    [FORMAT_KEY]: FORMAT_DEFAULT_VALUE,
    [COMPRESSION_KEY]: COMPRESSION_DEFAULT_VALUE,
    [SHARING_KEY]: SHARING_DEFAULT_VALUE,
}

const getEndpointExtension = (format, compression) => {
    if (!compression) return format

    return `${format}.${compression}`
}

export const onSubmit = async values => {
    const api = await getApi()

    const { schemas, format, compression, skipSharing } = values

    const { baseUrl } = api
    const endpoint = `metadata`
    const extension = getEndpointExtension(format, compression)
    const schemaParams = Object.keys(schemas)
        .filter(s => schemas[s])
        .map(name => `${name}=true`)
        .join('&')

    const params = [`skipSharing=${skipSharing}`, 'download=true', schemaParams]
        .filter(v => v)
        .join('&')

    const url = `${baseUrl}${endpoint}.${extension}?${params}`

    download(url, endpoint)
}
