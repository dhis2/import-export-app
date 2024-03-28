import i18n from '@dhis2/d2-i18n'
import { Divider, Tag } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { jsDateToString } from '../../utils/helper.js'
import { Details } from './Details/Details.js'
import styles from './JobSummary.module.css'
import { Log } from './Log/Log.js'
import { Summary } from './Summary/Summary.js'

const Header = ({ jobDetails, task, showFileDetails }) => (
    <div className={styles.header}>
        <h3 className={styles.title}>{`${i18n.t('Job summary')}`}</h3>
        {showFileDetails && jobDetails?.files?.length && (
            <div className={styles.taskDetails}>
                <span data-test="job-summary-filename">
                    {jobDetails.files[0].name}
                </span>{' '}
                -{' '}
                <span data-test="job-summary-date">
                    {jsDateToString(task.created)}{' '}
                </span>
            </div>
        )}
    </div>
)

Header.propTypes = {
    jobDetails: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired,
    showFileDetails: PropTypes.bool,
}

const Tags = ({ jobDetails, task }) => (
    <div className={styles.tags} data-test="job-summary-tags">
        {task.completed ? (
            <Tag positive>{i18n.t('Completed')}</Tag>
        ) : (
            <Tag neutral>{i18n.t('In progress')}</Tag>
        )}
        {task.error && (
            <Tag negative bold>
                {i18n.t('Error')}
            </Tag>
        )}
        {task.summary &&
            task.summary.conflicts &&
            (task.summary.conflicts.length || null) && (
                <Tag negative>{i18n.t('Conflicts')}</Tag>
            )}
        {jobDetails.dryRun && (
            <Tag neutral bold>
                {i18n.t('Dry run')}
            </Tag>
        )}
    </div>
)

Tags.propTypes = {
    jobDetails: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired,
}

const JobSummary = ({
    task,
    showFileDetails = true,
    showJobDetails = false,
    dataTest,
}) => {
    if (!task) {
        return null
    }
    const { jobDetails } = task

    return (
        <div className={styles.container} data-test={dataTest}>
            <Header
                jobDetails={jobDetails}
                task={task}
                showFileDetails={showFileDetails}
            />
            <Tags jobDetails={jobDetails} task={task} />
            <Divider />
            {task.completed && task.summary && (
                <Summary
                    summary={task.summary}
                    importType={task.importType}
                    isDryRun={jobDetails.dryRun}
                />
            )}
            <div className={styles.events}>
                <Log events={task.events} />
            </div>
            {showJobDetails && (
                <div className={styles.jobDetails}>
                    <Details details={task.jobDetails} />
                </div>
            )}
        </div>
    )
}

JobSummary.propTypes = {
    dataTest: PropTypes.string.isRequired,
    showFileDetails: PropTypes.bool,
    showJobDetails: PropTypes.bool,
    task: PropTypes.object,
}

export { JobSummary }
