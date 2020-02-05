import React from 'react'
import PropTypes from 'prop-types'
import {
    Card,
    CircularLoader,
    ComponentCover,
    LinearLoader,
} from '@dhis2/ui-core'

import s from './Page.module.css'
import { testIds } from '../../utils/testIds'
import { JobSummary, MiniJobSummary } from '../../components/JobSummary'

const Page = ({
    title,
    desc,
    icon,
    summaryTask,
    showFullSummaryTask,
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
        <div className={s.container} data-test={dataTest}>
            <div className={s.header}>
                <span className={s.icon}>{icon}</span>
                <span className={s.title}>{title}</span>
                <p className={s.desc}>{desc}</p>
            </div>
            {summaryTask && (
                <Card className={s.preBody}>
                    <div className={s.content}>
                        {showFullSummaryTask ? (
                            <JobSummary
                                task={summaryTask}
                                dataTest={testIds.JobSummary.container}
                            />
                        ) : (
                            <MiniJobSummary
                                task={summaryTask}
                                dataTest={testIds.MiniJobSummary.container}
                            />
                        )}
                    </div>
                </Card>
            )}
            <Card>
                {!!loading && <ComponentCover>{loadingEl}</ComponentCover>}
                <div className={s.content}>{children}</div>
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
