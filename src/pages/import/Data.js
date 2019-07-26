import { Button } from '@dhis2/ui-core'
import React, { useState } from 'react'
import cx from 'classnames'
import i18n from '@dhis2/d2-i18n'

import { Form } from 'react-final-form'

import { DataElementIdScheme } from '../../components/Inputs/DataElementIdScheme'
import { DataIcon } from '../../components/Icon'
import { DryRun } from '../../components/Inputs/DryRun'
import { Error } from '../../components/Error'
import { File } from '../../components/FinalFormComponents/File'
import { FormContent } from '../../components/FormContent'
import { FormFoot } from '../../components/FormFoot'
import { FormHead } from '../../components/FormHead'
import { Format } from '../../components/Inputs/Format'
import { IdScheme } from '../../components/Inputs/idScheme'
import { MoreOptions } from '../../components/MoreOptions'
import { OrgUnitIdScheme } from '../../components/Inputs/OrgUnitIdScheme'
import { PreheatCache } from '../../components/Inputs/PreheatCache'
import { Progress } from '../../components/Loading/Progress'
import { SkipExistingCheck } from '../../components/Inputs/SkipExistingCheck'
import { Strategy } from '../../components/Inputs/Strategy'
import { defaultValues, supportedFormats, onSubmit } from './Data/helper'
import stylesForm from '../../components/Form/styles.module.css'
import stylesFormBase from '../../components/FormBase/styles.module.css'

export const DataImport = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const onSubmitHandler = onSubmit(setLoading, setError)

    if (loading) return <Progress />
    if (error) return <Error message={error} onClear={() => setError('')} />

    return (
        <Form onSubmit={onSubmitHandler} initialValues={defaultValues}>
            {({ handleSubmit }) => (
                <div className={stylesForm.wrapper}>
                    <form
                        className={cx(stylesFormBase.form, stylesForm.form)}
                        onSubmit={handleSubmit}
                        style={{ width: 800 }}
                    >
                        <FormHead
                            icon={DataImport.menuIcon}
                            label={DataImport.title}
                        />

                        <FormContent>
                            <File name="upload" />
                            <Format options={supportedFormats} />
                            <DryRun />
                            <Strategy />
                            <PreheatCache />

                            <MoreOptions>
                                <DataElementIdScheme />
                                <OrgUnitIdScheme />
                                <IdScheme />
                                <SkipExistingCheck />
                            </MoreOptions>
                        </FormContent>

                        <FormFoot>
                            <Button primary type="submit">
                                {i18n.t('Import')}
                            </Button>
                        </FormFoot>
                    </form>
                </div>
            )}
        </Form>
    )
}

DataImport.path = '/import/data'
DataImport.title = i18n.t('Data Import')
DataImport.menuIcon = <DataIcon />
DataImport.desc = i18n.t(
    'Import data values on the DXF 2 XML, JSON, CSV and PDF formatrant s. DXF 2 is the standard exchange format for DHIS 2.'
)

//export class DataImport extends FormBase {
//    static path = '/import/data'
//
//    static order = 2
//    static title = i18n.t('Data Import')
//    static desc = i18n.t(
//        'Import data values on the DXF 2 XML, JSON, CSV and PDF formatrant s. DXF 2 is the standard exchange format for DHIS 2.'
//    )
//
//    static menuIcon = <DataIcon />
//    icon = <DataIcon />
//
//    formWidth = 800
//    formTitle = i18n.t('Data Import')
//    submitLabel = i18n.t('Import')
//
//    fields = [
//        ...getFormFields([
//            'upload',
//            'format',
//            'dryRun',
//            'firstRowIsHeader',
//            'strategy',
//            'preheatCache',
//        ]),
//
//        getFormFieldMoreOptions(),
//
//        ...getFormFields([
//            'dataElementIdScheme',
//            'orgUnitIdScheme',
//            'idScheme',
//            'skipExistingCheck',
//        ]),
//    ]
//
//    state = getFormValues([
//        'upload',
//        'format:.json:json,xml,csv,pdf,adx',
//        'dryRun',
//        'strategy',
//        'preheatCache',
//        'dataElementIdScheme',
//        'orgUnitIdScheme',
//        'idScheme',
//        'skipExistingCheck',
//        'firstRowIsHeader',
//    ])
//
//    async componentDidMount() {
//        await fetchLog('', 'DATAVALUE_IMPORT')
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
//    onSubmit = () => {
//        try {
//            const { upload, format, firstRowIsHeader } = this.getFormState()
//            const formattedFormat = format.substr(1)
//            const append = [`format=${formattedFormat}`, 'async=true']
//
//            if (format === '.csv') {
//                append.push(`firstRowIsHeader=${firstRowIsHeader}`)
//            }
//
//            const params = getParamsFromFormState(
//                this.getFormState(),
//                [
//                    'dataElementIdScheme',
//                    'dryRun',
//                    'idScheme',
//                    'orgUnitIdScheme',
//                    'preheatCache',
//                    'skipExistingCheck',
//                    'strategy',
//                ],
//                append
//            )
//
//            this.setProcessing()
//
//            const { REACT_APP_DHIS2_BASE_URL } = process.env
//            const url = `${REACT_APP_DHIS2_BASE_URL}/api/dataValueSets.json?${params}`
//            const xhr = getUploadXHR(
//                url,
//                upload,
//                'DATAVALUE_IMPORT',
//                this.clearProcessing,
//                this.assertOnError,
//                formattedFormat
//            )
//
//            xhr.send(upload)
//        } catch (e) {
//            console.log('Data Import error', e, '\n')
//        }
//    }
//}
