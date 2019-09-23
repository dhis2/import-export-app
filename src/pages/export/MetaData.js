import React from 'react'
import i18n from '@dhis2/d2-i18n'

import { FormBase } from '../../components/FormBase'
import { MetadataExportIcon } from '../../components/Icon'
import { getFormFields, getFormValues, getDownloadUrl } from '../../helpers'
import { isProduction } from '../../helpers/env'

import { fetchSchemas } from '../../reducers/schemas/thunks'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import {
    getSchemas,
    getSortedSchemaGroups,
} from '../../reducers/schemas/selectors'

const EXCLUDE_SCHEMAS = new Set([
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

const MetaDataExportPage = ({
    schemasLoading,
    schemasLoaded,
    schemas,
    schemaGroups,
    fetchSchemas,
}) => {
    useEffect(
        () => {
            !schemasLoaded && fetchSchemas(EXCLUDE_SCHEMAS)
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    )

    if (schemasLoading) {
        return 'Schemas loading...'
    }

    return (
        <code>
            <pre>{JSON.stringify(schemas, null, 2)}</pre>
        </code>
    )
}

export const MetaDataExport = connect(
    state => ({
        schemasLoaded: state.schemas.loaded,
        schemasLoading: state.schemas.loading,
        schemas: getSchemas(state),
        schemaGroups: getSortedSchemaGroups(state),
    }),
    { fetchSchemas }
)(MetaDataExportPage)

MetaDataExport.path = '/export/metadata'
MetaDataExport.menuIcon = <MetadataExportIcon />
MetaDataExport.order = 5
MetaDataExport.title = i18n.t('Metadata Export')
MetaDataExport.desc = i18n.t(
    'Export meta data like data elements and organisation units to the standard DHIS 2 exchange format.'
)

//export class MetaDataExport extends FormBase {
//    static path = '/export/metadata'
//
//    static order = 5
//    static title = i18n.t('Metadata Export')
//    static desc = i18n.t(
//        'Export meta data like data elements and organisation units to the standard DHIS 2 exchange format.'
//    )
//
//    static menuIcon = <MetadataExportIcon />
//    icon = <MetadataExportIcon />
//
//    formWidth = 800
//    formTitle = i18n.t('Meta Data Export')
//    submitLabel = i18n.t('Export')
//
//    fields = getFormFields(['schemas', 'format', 'compression', 'sharing'])
//
//    state = getFormValues([
//        'schemas',
//        'format:.json:json,xml,csv',
//        'compression',
//        'sharing',
//    ])
//
//    onSubmit = async () => {
//        try {
//            const {
//                schemas,
//                format,
//                compression,
//                sharing,
//            } = this.getFormState()
//
//            const endpoint = `metadata`
//            const downloadUrl = getDownloadUrl({
//                format,
//                compression,
//                endpoint,
//                sharing,
//            })
//            const schemaParams = Object.keys(schemas)
//                .filter(s => schemas[s])
//                .map(name => `${name}=true`)
//                .join('&')
//
//            const url = `${downloadUrl}&${schemaParams}`
//            window.location = url
//        } catch (e) {
//            !isProduction && console.log('MetaData Export error', e, '\n')
//        }
//    }
//}
