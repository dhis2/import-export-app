import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import {
    Card,
    CenteredContent,
    CircularLoader,
    ComponentCover,
    LinearLoader,
} from '@dhis2/ui'

import styles from './Page.module.css'
import { JobSummary, MiniJobSummary } from '../index'

const Page = ({
    title,
    desc,
    summaryTask,
    showFullSummaryTask = false,
    limitWidth = true,
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
        <div
            className={cx(styles.container, {
                [styles.limitedWidth]: limitWidth,
            })}
            data-test={dataTest}
        >
            <header className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.desc}>{desc}</p>
            </header>
            {summaryTask && (
                <Card className={styles.preBody}>
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
                </Card>
            )}
            <div className={styles.content}>
                {!!loading && (
                    <div className={styles.loading}>
                        <ComponentCover translucent>
                            <CenteredContent>{loadingEl}</CenteredContent>
                        </ComponentCover>
                    </div>
                )}
                {children}
            </div>
        </div>
    )
}

Page.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
        .isRequired,
    dataTest: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    limitWidth: PropTypes.bool,
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    showFullSummaryTask: PropTypes.bool,
    summaryTask: PropTypes.object,
}

export { Page }
