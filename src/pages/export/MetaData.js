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
import { Format } from '../../components/Inputs/Format'
import { Compression } from '../../components/Inputs/Compression'
import { Sharing } from '../../components/Inputs/Sharing'
import {
    EXCLUDE_SCHEMAS,
    supportedFormats,
    initialValues,
    onSubmit,
} from './MetaData/helper'
import stylesForm from '../../components/Form/styles.module.css'
import stylesFormBase from '../../components/FormBase/styles.module.css'

export const MetaDataExport = () => {
    return (
        <Form onSubmit={onSubmit} initialValues={initialValues}>
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
                            <Schemas excludeSchemas={EXCLUDE_SCHEMAS} />
                            <Format options={supportedFormats} />
                            <Compression />
                            <Sharing />
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

MetaDataExport.dataTestId = 'export-metadata'
MetaDataExport.path = '/export/metadata'
MetaDataExport.menuIcon = <MetadataExportIcon />
MetaDataExport.order = 5
MetaDataExport.title = i18n.t('Metadata Export')
MetaDataExport.desc = i18n.t(
    'Export meta data like data elements and organisation units to the standard DHIS 2 exchange format.'
)
