import { Button } from '@dhis2/ui-core'
import { Form } from 'react-final-form'
import React, { useState } from 'react'
import cx from 'classnames'
import i18n from '@dhis2/d2-i18n'

import { DataElementIdScheme } from '../../components/Inputs/DataElementIdScheme'
import { DataIcon } from '../../components/Icon'
import { DryRun } from '../../components/Inputs/DryRun'
import { Error } from '../../components/Error'
import { FORMAT_KEY, Format, OPTION_CSV } from '../../components/Inputs/Format'
import { FirstRowIsHeader } from '../../components/Inputs/FirstRowIsHeader'
import { File } from '../../components/FinalFormComponents/File'
import { FormContent } from '../../components/FormSections/FormContent'
import { FormFooter } from '../../components/FormSections/FormFooter'
import { FormHeader } from '../../components/FormSections/FormHeader'
import { IdScheme } from '../../components/Inputs/idScheme'
import { MoreOptions } from '../../components/FormSections/MoreOptions'
import { OrgUnitIdScheme } from '../../components/Inputs/OrgUnitIdScheme'
import { PreheatCache } from '../../components/Inputs/PreheatCache'
import { Progress } from '../../components/Loading/Progress'
import { SkipExistingCheck } from '../../components/Inputs/SkipExistingCheck'
import { Strategy } from '../../components/Inputs/Strategy'
import { defaultValues, supportedFormats, onSubmit } from './Data/helper'
import { useErrorHandler } from '../../helpers/useErrorHandler'
import stylesForm from '../../components/Form/styles.module.css'
import stylesFormBase from '../../components/FormBase/styles.module.css'

export const DataImport = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useErrorHandler()
    const onSubmitHandler = onSubmit(setLoading, setError)

    if (loading) return <Progress />
    if (error)
        return (
            <Error
                message={error}
                onClear={() =>
                    setError({ target: { response: { message: '' } } })
                }
            />
        )

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
                            icon={DataImport.menuIcon}
                            label={DataImport.title}
                        />

                        <FormContent>
                            <File name="upload" />
                            <Format options={supportedFormats} />
                            <DryRun />

                            <FirstRowIsHeader
                                show={values[FORMAT_KEY] === OPTION_CSV.value}
                            />

                            <Strategy />
                            <PreheatCache />

                            <MoreOptions>
                                <DataElementIdScheme />
                                <OrgUnitIdScheme />
                                <IdScheme />
                                <SkipExistingCheck />
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

DataImport.path = '/import/data'
DataImport.title = i18n.t('Data Import')
DataImport.menuIcon = <DataIcon />
DataImport.desc = i18n.t(
    'Import data values on the DXF 2 XML, JSON, CSV and PDF formatrant s. DXF 2 is the standard exchange format for DHIS 2.'
)
