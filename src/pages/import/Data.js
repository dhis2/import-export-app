import { Button } from '@dhis2/ui-core'
import React from 'react'
import i18n from '@dhis2/d2-i18n'
import cx from 'classnames'
import { Form } from 'react-final-form'

import {
    DATA_ELEMENT_ID_SCHEME_DEFAULT_VALUE,
    DATA_ELEMENT_ID_SCHEME_KEY,
    DataElementIdScheme,
} from '../../components/Inputs/DataElementIdScheme'
import {
    DRY_RUN_DEFAULT_VALUE,
    DRY_RUN_KEY,
    DryRun,
} from '../../components/Inputs/DryRun'
import { DataIcon } from '../../components/Icon'
import {
    FORMAT_DEFAULT_VALUE,
    FORMAT_KEY,
    Format,
    OPTION_ADX,
    OPTION_CSV,
    OPTION_JSON,
    OPTION_PDF,
    OPTION_XML,
} from '../../components/Inputs/Format'
import { File } from '../../components/form/File'
import { FormContent } from '../../components/FormContent'
import { FormFoot } from '../../components/FormFoot'
import { FormHead } from '../../components/FormHead'
import {
    ID_SCHEME_DEFAULT_VALUE,
    ID_SCHEME_KEY,
    IdScheme,
} from '../../components/Inputs/idScheme'
import { MoreOptions } from '../../components/MoreOptions'
import {
    ORG_UNIT_ID_SCHEME_DEFAULT_VALUE,
    ORG_UNIT_ID_SCHEME_KEY,
    OrgUnitIdScheme,
} from '../../components/Inputs/OrgUnitIdScheme'
import {
    PREHEAT_CACHE_DEFAULT_VALUE,
    PREHEAT_CACHE_KEY,
    PreheatCache,
} from '../../components/Inputs/PreheatCache'
import {
    SKIP_EXISTING_CHECK_DEFAULT_VALUE,
    SKIP_EXISTING_CHECK_KEY,
    SkipExistingCheck,
} from '../../components/Inputs/SkipExistingCheck'
import {
    STRATEGY_DEFAULT_VALUE,
    STRATEGY_KEY,
    Strategy,
} from '../../components/Inputs/Strategy'
import stylesForm from '../../components/Form/styles.module.css'
import stylesFormBase from '../../components/FormBase/styles.module.css'

const supportedFormats = [
    OPTION_JSON,
    OPTION_XML,
    OPTION_ADX,
    OPTION_PDF,
    OPTION_CSV,
]

const defaultValues = {
    [FORMAT_KEY]: FORMAT_DEFAULT_VALUE,
    [DRY_RUN_KEY]: DRY_RUN_DEFAULT_VALUE,
    [STRATEGY_KEY]: STRATEGY_DEFAULT_VALUE,
    [PREHEAT_CACHE_KEY]: PREHEAT_CACHE_DEFAULT_VALUE,
    [DATA_ELEMENT_ID_SCHEME_KEY]: DATA_ELEMENT_ID_SCHEME_DEFAULT_VALUE,
    [ORG_UNIT_ID_SCHEME_KEY]: ORG_UNIT_ID_SCHEME_DEFAULT_VALUE,
    [ID_SCHEME_KEY]: ID_SCHEME_DEFAULT_VALUE,
    [SKIP_EXISTING_CHECK_KEY]: SKIP_EXISTING_CHECK_DEFAULT_VALUE,
}

export const DataImport = () => {
    return (
        <Form onSubmit={console.log} initialValues={defaultValues}>
            {({ handleSubmit }) => (
                <div className={stylesForm.wrapper}>
                    <form
                        className={cx(stylesFormBase.form, stylesForm.form)}
                        onSubmit={handleSubmit}
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
