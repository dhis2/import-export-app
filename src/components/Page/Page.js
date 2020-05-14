import React from 'react'
import PropTypes from 'prop-types'
import {
    Card,
    CircularLoader,
    ComponentCover,
    LinearLoader,
} from '@dhis2/ui-core'

import styles from './Page.module.css'
import { JobSummary, MiniJobSummary } from '../../components/'

const Page = ({
    title,
    desc,
    icon,
    summaryTask,
    showFullSummaryTask = false,
    children,
    loading = false,
    dataTest,
}) => {
    const loadingEl =
        typeof loading == 'number' ? (
            <LinearLoader amount={loading} />
        ) : (
            <CircularLoader />
        )

    return (
        <div className={styles.container} data-test={dataTest}>
            <div className={styles.header}>
                <span className={styles.iconAndTitle}>
                    <span className={styles.icon}>{icon}</span>
                    <span className={styles.title}>{title}</span>
                </span>
                <p className={styles.desc}>{desc}</p>
            </div>
            {summaryTask && (
                <Card className={styles.preBody}>
                    <div className={styles.content}>
                        {showFullSummaryTask ? (
                            <JobSummary
                                task={summaryTask}
                                dataTest="job-summary-container"
                            />
                        ) : (
                            <MiniJobSummary
                                task={summaryTask}
                                dataTest="mini-job-summary-container"
                            />
                        )}
                    </div>
                </Card>
            )}
            <Card>
                {!!loading && <ComponentCover>{loadingEl}</ComponentCover>}
                <div className={styles.content}>{children}</div>
            </Card>
        </div>
    )
}

Page.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
        .isRequired,
    dataTest: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    showFullSummaryTask: PropTypes.bool,
    summaryTask: PropTypes.object,
}

export { Page }
