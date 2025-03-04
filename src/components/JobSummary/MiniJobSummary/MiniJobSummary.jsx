import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { MoreOptions } from '../../index.js'
import { JobSummary } from '../JobSummary.jsx'

const MiniJobSummary = ({ task, dataTest }) => {
    if (!task) {
        return null
    }

    return (
        <div data-test={dataTest}>
            <MoreOptions
                label={i18n.t('View summary of recently started import job')}
                dataTest={`${dataTest}-MoreOptions`}
                noBottomMargin
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
