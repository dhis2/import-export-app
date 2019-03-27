import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { api } from 'services'
import { getFormFields, getFormValues, getDownloadUrl } from 'helpers'
import { FormBase } from 'components/FormBase'
import { MetadataExportIcon } from 'components/Icon'

const EXCLUDE_PARAMS = [
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
]

export class MetaDataExport extends FormBase {
    static path = '/export/metadata'

    static order = 5
    static title = i18n.t('Metadata Export')
    static desc = i18n.t(
        'Export meta data like data elements and organisation units to the standard DHIS 2 exchange format.'
    )

    static menuIcon = <MetadataExportIcon />
    icon = <MetadataExportIcon />

    formWidth = 800
    formTitle = i18n.t('Meta Data Export')
    submitLabel = i18n.t('Export')

    fields = getFormFields(['schemas', 'format', 'compression', 'sharing'])

    state = getFormValues([
        'schemas',
        'format:.json:json,xml,csv',
        'compression',
        'sharing',
    ])

    onSubmit = async () => {
        try {
            const {
                schemas,
                format,
                compression,
                sharing,
            } = this.getFormState()

            let endpoint = `metadata`
            const downloadUrl = getDownloadUrl({
                format,
                compression,
                endpoint,
                sharing,
            })
            const schemaParams = schemas
                .map(name => name)
                .sort()
                .map(name => `${name}=true`)
                .join('&')

            const url = downloadUrl.concat(`&${schemaParams}`)
            window.location = url
        } catch (e) {
            console.log('MetaData Export error', e, '\n')
        }
    }
}
