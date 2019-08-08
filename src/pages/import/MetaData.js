import { Button } from '@dhis2/ui-core'
import { Form } from 'react-final-form'
import React, { useState } from 'react'
import cx from 'classnames'
import i18n from '@dhis2/d2-i18n'

import { Async } from '../../components/Inputs/Async'
import { AtomicMode } from '../../components/Inputs/AtomicMode'
import { ClassKey } from '../../components/Inputs/ClassKey'
import { Error } from '../../components/Error'
import { FORMAT_KEY, Format, OPTION_CSV } from '../../components/Inputs/Format'
import { FirstRowIsHeader } from '../../components/Inputs/FirstRowIsHeader'
import { FlushMode } from '../../components/Inputs/FlushMode'
import { FormContent } from '../../components/FormSections/FormContent'
import { FormFooter } from '../../components/FormSections/FormFooter'
import { FormHeader } from '../../components/FormSections/FormHeader'
import { Identifier } from '../../components/Inputs/Identifier'
import { ImportMode } from '../../components/Inputs/ImportMode'
import { ImportReportMode } from '../../components/Inputs/ImportReportMode'
import { ImportStrategy } from '../../components/Inputs/ImportStrategy'
import { InclusionStrategy } from '../../components/Inputs/InclusionStrategy'
import { MergeMode } from '../../components/Inputs/MergeMode'
import { MetadataImportIcon } from '../../components/Icon'
import { MoreOptions } from '../../components/FormSections/MoreOptions'
import { PreheatMode } from '../../components/Inputs/PreheatMode'
import { Progress } from '../../components/Loading/Progress'
import { SkipSharing } from '../../components/Inputs/SkipSharing'
import { SkipValidation } from '../../components/Inputs/SkipValidation'
import { Upload } from '../../components/Inputs/Upload'
import {
    defaultValues,
    onSubmit,
    supportedFormats,
    useLoadClassKeyOptions,
} from './MetaData/helper'
import stylesForm from '../../components/Form/styles.module.css'
import stylesFormBase from '../../components/FormBase/styles.module.css'

export const MetaDataImport = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const onSubmitHandler = onSubmit(setLoading, setError)
    const {
        //error: classKeyError,
        options: classKeyOptions,
    } = useLoadClassKeyOptions()

    if (error) return <Error message={error} onClear={() => setError('')} />
    if (loading) return <Progress />

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
                            icon={MetaDataImport.menuIcon}
                            label={MetaDataImport.title}
                        />

                        <FormContent>
                            <Upload />
                            <Format options={supportedFormats} />
                            <ImportMode />

                            <FirstRowIsHeader
                                show={values[FORMAT_KEY] === OPTION_CSV.value}
                            />

                            <ClassKey
                                show={
                                    values[FORMAT_KEY] === OPTION_CSV.value &&
                                    !!classKeyOptions.length
                                }
                                options={classKeyOptions}
                                defaultValue={
                                    classKeyOptions.length
                                        ? classKeyOptions[0].value
                                        : ''
                                }
                            />

                            <Identifier />
                            <ImportReportMode />
                            <PreheatMode />
                            <ImportStrategy />
                            <AtomicMode />
                            <MergeMode />

                            <MoreOptions>
                                <FlushMode />
                                <SkipSharing />
                                <SkipValidation />
                                <Async />
                                <InclusionStrategy />
                            </MoreOptions>
                        </FormContent>

                        <FormFooter>
                            <Button primary type="submit">
                                {i18n.t('Import')}
                            </Button>
                        </FormFooter>
                    </form>
                </div>
            )}
        </Form>
    )
}

MetaDataImport.path = '/import/metadata'
MetaDataImport.title = i18n.t('Metadata Import')
MetaDataImport.menuIcon = <MetadataImportIcon />
MetaDataImport.desc = i18n.t(
    'Import metadata like data elements and organisation units using the standard DHIS 2 exchange format called DXF 2.'
)
