import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Divider } from '@dhis2/ui-core'

import s from './JobSummary.module.css'
import { jsDateToString } from '../../utils/helper'
import { testIds } from '../../utils/testIds'
import { Chip } from './Chip/'
import { Events } from './Events/'
import { Summary } from './Summary/'

const JobSummary = ({ task, showDetails = true, dataTest }) => {
    if (!task) return null

    return (
        <div className={s.container} data-test={dataTest}>
            <div className={s.header}>
                <h3 className={s.title}>{`${i18n.t('Job summary')}`}</h3>
                {showDetails && (
                    <span className={s.taskDetails}>
                        <span data-test={testIds.JobSummary.filename}>
                            {task.file}
                        </span>{' '}
                        -{' '}
                        <span data-test={testIds.JobSummary.date}>
                            {jsDateToString(task.created)}{' '}
                        </span>
                    </span>
                )}
            </div>
            <div className={s.chips} data-test={testIds.JobSummary.chips}>
                {task.completed ? (
                    <Chip success text={i18n.t('Completed')} />
                ) : (
                    <Chip text={i18n.t('In progress')} />
                )}
                {task.error && <Chip error text={i18n.t('Error')} />}
                {task.summary && task.summary.conflicts && (
                    <Chip warning text={i18n.t('Conflicts')} />
                )}
            </div>
            <Divider />
            {task.completed && task.summary && (
                <Summary summary={task.summary} />
            )}
            <div className={s.events}>
                <Events events={task.events} />
            </div>
        </div>
    )
}

JobSummary.propTypes = {
    dataTest: PropTypes.string.isRequired,
    showDetails: PropTypes.bool,
    task: PropTypes.object,
}

export { JobSummary }
