import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { JobSummary } from '../JobSummary'
import { MoreOptions } from '../../MoreOptions'

const MiniJobSummary = ({ task, dataTest }) => {
    if (!task) return null

    return (
        <div data-test={dataTest}>
            <MoreOptions
                label={i18n.t('View summary of recently started import job')}
                dataTest={`${dataTest}-MoreOptions`}
            >
                <JobSummary task={task} dataTest={`${dataTest}-JobSummary`} />
            </MoreOptions>
        </div>
    )
}

MiniJobSummary.propTypes = {
    dataTest: PropTypes.string.isRequired,
    task: PropTypes.object,
}

export { MiniJobSummary }
