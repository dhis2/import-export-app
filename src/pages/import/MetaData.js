import { Button } from '@dhis2/ui-core'
import { Form } from 'react-final-form'
import React, { useState } from 'react'
import cx from 'classnames'
import i18n from '@dhis2/d2-i18n'

import { Async } from '../../components/Inputs/Async'
import { AtomicMode } from '../../components/Inputs/AtomicMode'
import { Error } from '../../components/Error'
import {
    FIRST_ROW_IS_HEADER_KEY,
    FirstRowIsHeader,
    OPTION_NO,
} from '../../components/Inputs/FirstRowIsHeader'
import { FORMAT_KEY, Format, OPTION_CSV } from '../../components/Inputs/Format'
import { File } from '../../components/FinalFormComponents/File'
import { FlushMode } from '../../components/Inputs/FlushMode'
import { FormContent } from '../../components/FormSections/FormContent'
import { FormFooter } from '../../components/FormSections/FormFooter'
import { FormHeader } from '../../components/FormSections/FormHeader'
import { Identifier } from '../../components/Inputs/Identifier'
import { ImportMode } from '../../components/Inputs/ImportMode'
import { InclusionStrategy } from '../../components/Inputs/InclusionStrategy'
import { MergeMode } from '../../components/Inputs/MergeMode'
import { MetadataImportIcon } from '../../components/Icon'
import { MoreOptions } from '../../components/FormSections/MoreOptions'
import { PreheatCache } from '../../components/Inputs/PreheatCache'
import { Progress } from '../../components/Loading/Progress'
import { ReportMode } from '../../components/Inputs/ReportMode'
import { SkipSharing } from '../../components/Inputs/SkipSharing'
import { SkipValidation } from '../../components/Inputs/SkipValidation'
import { Strategy } from '../../components/Inputs/Strategy'
import { supportedFormats, defaultValues, onSubmit } from './MetaData/helper'
import stylesForm from '../../components/Form/styles.module.css'
import stylesFormBase from '../../components/FormBase/styles.module.css'

export const MetaDataImport = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    //const onSubmitHandler = onSubmit(setLoading, setError)
    const onSubmitHandler = values => console.log('values', values)

    if (loading) return <Progress />
    if (error) return <Error message={error} onClear={() => setError('')} />

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
                            <File name="upload" />
                            <Format options={supportedFormats} />
                            <ImportMode />

                            <FirstRowIsHeader
                                show={values[FORMAT_KEY] === OPTION_CSV.value}
                            />

                            <Identifier />
                            <ReportMode />
                            <PreheatCache />
                            <Strategy />
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

//class _MetaDataImport extends FormBase {
//    static path = '/import/metadata'
//
//    static order = 1
//    static title = i18n.t('Metadata Import')
//    static desc = i18n.t(
//        'Import metadata like data elements and organisation units using the standard DHIS 2 exchange format called DXF 2.'
//    )
//
//    static menuIcon = <MetadataImportIcon />
//    icon = <MetadataImportIcon />
//
//    formWidth = 800
//    formTitle = i18n.t('Metadata Import')
//    submitLabel = i18n.t('Import')
//
//    fields = [
//        ...getFormFields([
//            'upload',
//            'format',
//            'importMode',
//            'firstRowIsHeader',
//            'classKey',
//            'identifier',
//            'importReportMode',
//            'preheatMode',
//            'importStrategy',
//            'atomicMode',
//            'mergeMode',
//        ]),
//
//        getFormFieldMoreOptions(),
//
//        ...getFormFields([
//            'flushMode',
//            'skipSharing',
//            'skipValidation',
//            'async',
//            'inclusionStrategy',
//        ]),
//    ]
//
//    state = getFormValues([
//        '_context',
//        'upload',
//        'format:.json:json,xml,csv',
//        'dryRun',
//        'classKey',
//        'importMode',
//        'identifier',
//        'importReportMode',
//        'preheatMode',
//        'importStrategy',
//        'atomicMode',
//        'mergeMode',
//        'flushMode',
//        'skipSharing',
//        'skipValidation',
//        'async',
//        'inclusionStrategy',
//        'firstRowIsHeader',
//    ])
//
//    async componentDidMount() {
//        await fetchLog('', 'METADATA_IMPORT')
//        eventEmitter.emit('summary.clear')
//        await this.fetch()
//    }
//
//    async fetch() {
//        try {
//            const { data } = await api.get('metadata/csvImportClasses')
//            const values = data.map(v => ({
//                value: v,
//                label: v.split('_').join(' '),
//            }))
//
//            this.setState({
//                classKey: {
//                    values,
//                    selected: values[0]['value'],
//                },
//            })
//        } catch (e) {
//            console.log('fetch csvImportClasses failed')
//            console.log(e)
//        }
//    }
//
//    onFormUpdate = (name, value) => {
//        if (name === 'format') {
//            const { _context } = this.state
//
//            if (value === '.csv' && _context !== CTX_CSV_OPTION) {
//                this.changeContext(CTX_CSV_OPTION)
//            } else {
//                this.changeContext(CTX_DEFAULT)
//            }
//        }
//    }
//
//    onSubmit = async () => {
//        try {
//            let append = []
//            const formData = new FormData()
//            const {
//                upload,
//                format,
//                classKey,
//                firstRowIsHeader,
//            } = this.getFormState()
//
//            if (!upload) {
//                this.assertOnError({
//                    target: {
//                        response: JSON.stringify({
//                            message: 'Upload field is required',
//                        }),
//                    },
//                })
//            }
//
//            formData.set('upload', upload)
//
//            if (format === '.csv') {
//                append = [
//                    ...append,
//                    `classKey=${classKey}`,
//                    `firstRowIsHeader=${firstRowIsHeader}`,
//                ]
//            }
//
//            append.push('format=json')
//
//            const params = getParamsFromFormState(
//                this.getFormState(),
//                [
//                    'importMode',
//                    'dryRun',
//                    'identifier',
//                    'importReportMode',
//                    'preheatMode',
//                    'importStrategy',
//                    'atomicMode',
//                    'mergeMode',
//                    'flushMode',
//                    'skipSharing',
//                    'skipValidation',
//                    'async',
//                    'inclusionStrategy',
//                ],
//                append
//            )
//
//            this.setProcessing()
//
//            const { REACT_APP_DHIS2_BASE_URL } = process.env
//            const url = `${REACT_APP_DHIS2_BASE_URL}/api/metadata.json?${params}`
//            const xhr = getUploadXHR(
//                url,
//                upload,
//                'METADATA_IMPORT',
//                this.clearProcessing,
//                this.assertOnError,
//                format.substr(1)
//            )
//            xhr.send(upload)
//        } catch (e) {
//            console.log('MetaData Import error', e, '\n')
//            this.clearProcessing()
//        } finally {
//        }
//    }
//}
