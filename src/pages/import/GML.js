import React, { useState } from 'react'
import i18n from '@dhis2/d2-i18n'

import { GMLIcon } from '../../components/Icon'
import { TaskSummary } from '../../components/TaskSummary'
import { Error } from '../../components/Error'
import { Progress } from '../../components/Loading/Progress'
import { Button } from '@dhis2/ui-core'
import { Form } from 'react-final-form'
import cx from 'classnames'
import { FormContent } from '../../components/FormSections/FormContent'
import { FormFooter } from '../../components/FormSections/FormFooter'
import { FormHeader } from '../../components/FormSections/FormHeader'
import { DryRun } from '../../components/Inputs/DryRun'
import { Upload } from '../../components/Inputs/Upload'
import { defaultValues, onSubmit } from './GML/helper'
import stylesForm from '../../components/Form/styles.module.css'
import stylesFormBase from '../../components/FormBase/styles.module.css'

export const GMLImport = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const onSubmitHandler = onSubmit(setLoading, setError)

    if (error) return <Error message={error} onClear={() => setError('')} />
    if (loading) return <Progress />

    return (
        <Form onSubmit={onSubmitHandler} initialValues={defaultValues}>
            {({ handleSubmit, values }) => (
                <div className={stylesForm.wrapper}>
                    <TaskSummary />
                    <form
                        className={cx(stylesFormBase.form, stylesForm.form)}
                        onSubmit={handleSubmit}
                        style={{ width: 800 }}
                    >
                        <FormHeader
                            icon={GMLImport.menuIcon}
                            label={GMLImport.title}
                        />

                        <FormContent>
                            <Upload />
                            <DryRun />
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
GMLImport.dataTestId = 'import-gml'
GMLImport.path = '/import/gml'
GMLImport.title = i18n.t('GML Import')
GMLImport.desc = i18n.t(
    'Import geographic data for organisation units using GML format. GML is an XML grammar for expressing geographical features.'
)
GMLImport.menuIcon = <GMLIcon />
