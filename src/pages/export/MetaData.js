import { Form } from 'react-final-form'
import { Button } from '@dhis2/ui-core'
import React from 'react'
import i18n from '@dhis2/d2-i18n'
import cx from 'classnames'

import { FormContent } from '../../components/FormSections/FormContent'
import { FormFooter } from '../../components/FormSections/FormFooter'
import { FormHeader } from '../../components/FormSections/FormHeader'
import { MetadataExportIcon } from '../../components/Icon'
import { Schemas } from '../../components/Inputs/Schemas'
import stylesForm from '../../components/Form/styles.module.css'
import stylesFormBase from '../../components/FormBase/styles.module.css'

//import { FormBase } from '../../components/FormBase'
//import { getFormFields, getFormValues, getDownloadUrl } from '../../helpers'
//import { isProduction } from '../../helpers/env'

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

export const MetaDataExport = () => {
    const onSubmitHandler = console.log.bind(null, 'MetaDataExport values')
    const defaultValues = {}

    return (
        <Form onSubmit={onSubmitHandler} initialValues={defaultValues}>
            {({ handleSubmit, values }) => (
                <div className={stylesForm.wrapper}>
                    <form
                        className={cx(stylesFormBase.form, stylesForm.form)}
                        onSubmit={handleSubmit}
                        style={{ width: 800 }}
                    >
                        <FormHeader
                            icon={MetaDataExport.menuIcon}
                            label={MetaDataExport.title}
                        />

                        <FormContent>
                            <Schemas excluseSchemas={EXCLUDE_SCHEMAS} />
                        </FormContent>

                        <FormFooter>
                            <Button primary type="submit">
                                {i18n.t('Export')}
                            </Button>
                        </FormFooter>
                    </form>
                </div>
            )}
        </Form>
    )
}

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
