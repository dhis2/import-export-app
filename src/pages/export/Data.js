import { Button } from '@dhis2/ui-core'
import { Form } from 'react-final-form'
import React, { useState } from 'react'
import cx from 'classnames'
import i18n from '@dhis2/d2-i18n'

import { Children } from '../../components/Inputs/Children'
import { Compression } from '../../components/Inputs/Compression'
import { DataElementIdScheme } from '../../components/Inputs/DataElementIdScheme'
import { DataIcon } from '../../components/Icon'
import { DataSets } from '../../components/Inputs/DataSets'
import { EndDate } from '../../components/Inputs/EndDate'
import { Error } from '../../components/Error'
import { FormContent } from '../../components/FormSections/FormContent'
import { FormFooter } from '../../components/FormSections/FormFooter'
import { FormHeader } from '../../components/FormSections/FormHeader'
import { Format } from '../../components/Inputs/Format'
import { IdScheme } from '../../components/Inputs/idScheme'
import { IncludeDeleted } from '../../components/Inputs/IncludeDeleted'
import { MoreOptions } from '../../components/FormSections/MoreOptions'
import { OrgUnit } from '../../components/Inputs/OrgUnit'
import { OrgUnitIdScheme } from '../../components/Inputs/OrgUnitIdScheme'
import { Progress } from '../../components/Loading'
import { StartDate } from '../../components/Inputs/StartDate'
import { supportedFormats, initialValues, onSubmit } from './Data/helper'
import { useErrorHandler } from '../../helpers/useErrorHandler'
import formBaseStyles from '../../components/FormBase/styles.module.css'
import formStyles from '../../components/Form/styles.module.css'

export const DataExport = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useErrorHandler()

    if (loading) return <Progress />
    if (error)
        return (
            <Error
                message={error}
                onClear={() =>
                    setError({
                        target: {
                            response: {
                                message: '',
                            },
                        },
                    })
                }
            />
        )

    return (
        <Form
            onSubmit={onSubmit(setLoading, setError)}
            initialValues={initialValues}
        >
            {({ handleSubmit, values }) => (
                <div className={formStyles.wrapper}>
                    <form
                        className={cx(formBaseStyles.form, formStyles.form)}
                        onSubmit={handleSubmit}
                        style={{ width: 800 }}
                    >
                        <FormHeader
                            icon={DataExport.menuIcon}
                            label={DataExport.title}
                        />

                        <FormContent>
                            <OrgUnit />
                            <Children />
                            <DataSets />
                            <StartDate />
                            <EndDate />
                            <Format options={supportedFormats} />
                            <Compression />

                            <MoreOptions>
                                <IncludeDeleted />
                                <DataElementIdScheme />
                                <OrgUnitIdScheme />
                                <IdScheme />
                            </MoreOptions>
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

DataExport.dataTest = 'export-data'
DataExport.path = '/export/data'
DataExport.menuIcon = <DataIcon />
DataExport.order = 7
DataExport.title = i18n.t('Data Export')
DataExport.desc = i18n.t(
    'Export data values. This is the regular export function which exports data to the DHIS 2 exchange format called DXF 2.'
)
