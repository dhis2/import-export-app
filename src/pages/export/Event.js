import { Button } from '@dhis2/ui-core'
import { Form } from 'react-final-form'
import React from 'react'
import cx from 'classnames'
import i18n from '@dhis2/d2-i18n'

import { Compression } from '../../components/Inputs/Compression'
import { EndDate } from '../../components/Inputs/EndDate'
import { EventIcon } from '../../components/Icon'
import { FormContent } from '../../components/FormSections/FormContent'
import { FormFooter } from '../../components/FormSections/FormFooter'
import { FormHeader } from '../../components/FormSections/FormHeader'
import { Format } from '../../components/Inputs/Format'
import { IdScheme } from '../../components/Inputs/idScheme'
import { IncludeDelete } from '../../components/Inputs/IncludeDelete'
import { Inclusion } from '../../components/Inputs/Inclusion'
import { MoreOptions } from '../../components/FormSections/MoreOptions'
import { OrgUnit } from '../../components/Inputs/OrgUnit'
import { ProgramStages } from '../../components/Inputs/ProgramStages'
import { Programs } from '../../components/Inputs/Programs'
import { StartDate } from '../../components/Inputs/StartDate'
import { supportedFormats, initialValues, onSubmit } from './Event/helper'
import formBaseStyles from '../../components/FormBase/styles.module.css'
import formStyles from '../../components/Form/styles.module.css'

export const EventExport = () => {
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
                            icon={EventExport.menuIcon}
                            label={EventExport.title}
                        />

                        <FormContent>
                            <OrgUnit multiple={false} />
                            <Programs />
                            <ProgramStages />
                            <IdScheme />
                            <StartDate />
                            <EndDate />
                            <Format options={supportedFormats} />
                            <Compression />

                            <MoreOptions>
                                <IncludeDelete />
                                <Inclusion />
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

EventExport.dataTest = 'export-event'
EventExport.path = '/export/event'
EventExport.order = 8
EventExport.title = i18n.t('Event Export')
EventExport.desc = i18n.t(
    'Export event data for programs, stages and tracked entities in the DXF 2 format.'
)
EventExport.menuIcon = <EventIcon />
