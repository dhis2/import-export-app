import { Button } from '@dhis2/ui-core'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import i18n from '@dhis2/d2-i18n'

import { DataElementIdScheme } from '../../components/Inputs/DataElementIdScheme'
import { DryRun } from '../../components/Inputs/DryRun'
import { Error } from '../../components/Error'
import { EventIcon } from '../../components/Icon'
import { EventIdScheme } from '../../components/Inputs/EventIdScheme'
import { FormContent } from '../../components/FormSections/FormContent'
import { FormFooter } from '../../components/FormSections/FormFooter'
import { FormHeader } from '../../components/FormSections/FormHeader'
import { Format } from '../../components/Inputs/Format'
import { IdScheme } from '../../components/Inputs/idScheme'
import {
    ORG_UNIT_ID_SCHEME_DEFAULT_OPTIONS,
    OrgUnitIdSchemeLoading,
    OrgUnitIdScheme,
} from '../../components/Inputs/OrgUnitIdScheme'
import { Progress } from '../../components/Loading/Progress'
import { TaskSummary } from '../../components/TaskSummary'
import { Upload } from '../../components/Inputs/Upload'
import { fetchUniqueOrgUnitAttributes } from '../../reducers/attributes/thunks'
import { supportedFormats, defaultValues, onSubmit } from './Event/helper'
import stylesForm from '../../components/Form/styles.module.css'
import stylesFormBase from '../../components/FormBase/styles.module.css'

export const EventImport = () => {
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
                            icon={EventImport.menuIcon}
                            label={EventImport.title}
                        />

                        <FormContent>
                            <Upload />
                            <Format options={supportedFormats} />
                            <DryRun />

                            <EventIdScheme />
                            <DataElementIdScheme />
                            <OrgUnitIdScheme />
                            <IdScheme />
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
EventImport.dataTest = 'import-event'
EventImport.path = '/import/event'
EventImport.title = i18n.t('Event Import')
EventImport.desc = i18n.t(
    'Import events for programs, stages and tracked entities in the DXF 2 format.'
)

EventImport.menuIcon = <EventIcon />
