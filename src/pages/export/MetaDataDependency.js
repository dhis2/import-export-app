import { Button } from '@dhis2/ui-core'
import { Form } from 'react-final-form'
import React from 'react'
import cx from 'classnames'
import i18n from '@dhis2/d2-i18n'

import { Compression } from '../../components/Inputs/Compression'
import { FormContent } from '../../components/FormSections/FormContent'
import { FormFooter } from '../../components/FormSections/FormFooter'
import { FormHeader } from '../../components/FormSections/FormHeader'
import { Format } from '../../components/Inputs/Format'
import { MetadataDependencyExportIcon } from '../../components/Icon'
import { ObjectList } from '../../components/Inputs/ObjectList'
import { ObjectType } from '../../components/Inputs/ObjectType'
import { SkipSharing } from '../../components/Inputs/SkipSharing'
import {
    supportedFormats,
    initialValues,
    onSubmit,
} from './MetaDataDependency/helper'
import formBaseStyles from '../../components/FormBase/styles.module.css'
import formStyles from '../../components/Form/styles.module.css'

export const MetaDataDependencyExport = () => {
    return (
        <Form onSubmit={onSubmit} initialValues={initialValues}>
            {({ handleSubmit, values }) => (
                <div className={formStyles.wrapper}>
                    <form
                        className={cx(formBaseStyles.form, formStyles.form)}
                        onSubmit={handleSubmit}
                        style={{ width: 800 }}
                    >
                        <FormHeader
                            icon={MetaDataDependencyExport.menuIcon}
                            label={MetaDataDependencyExport.title}
                        />

                        <FormContent>
                            <ObjectType />
                            <ObjectList />
                            <Format options={supportedFormats} />
                            <Compression />
                            <SkipSharing />
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

MetaDataDependencyExport.dataTest = 'export-metadata-dependency'
MetaDataDependencyExport.path = '/export/metadata-dependency'
MetaDataDependencyExport.order = 9
MetaDataDependencyExport.title = i18n.t('Metadata Dependency Export')
MetaDataDependencyExport.desc = i18n.t(
    'Export metadata like data sets and programs including related metadata objects.'
)
MetaDataDependencyExport.menuIcon = <MetadataDependencyExportIcon />
