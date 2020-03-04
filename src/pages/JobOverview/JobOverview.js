import React, { useContext } from 'react'
import i18n from '@dhis2/d2-i18n'

import styles from './JobOverview.module.css'
import { TaskContext } from '../../contexts/'
import { Page } from '../../components/Page'
import { TasksIcon } from '../../components/Icon'
import { JobOverview as JobOverviewComponent } from '../../components/JobOverview'

const JobOverview = () => {
    const { jobOverview, updateJobOverview } = useContext(TaskContext)

    const setActiveTypes = types => {
        updateJobOverview({
            activeTypes: types,
        })
    }
    const setSelectedJob = job => {
        updateJobOverview({
            selectedJob: job,
        })
    }

    return (
        <Page
            title={PAGE_NAME}
            desc={PAGE_DESCRIPTION}
            icon={PAGE_ICON}
            dataTest="job-overview-page"
        >
            <div className={styles.container}>
                <JobOverviewComponent
                    activeTypes={jobOverview.activeTypes}
                    setActiveTypes={setActiveTypes}
                    selectedJob={jobOverview.selectedJob}
                    setSelectedJob={setSelectedJob}
                />
            </div>
        </Page>
    )
}

// PAGE INFO
const PAGE_NAME = i18n.t('Job overview')
const PAGE_DESCRIPTION = i18n.t(
    'An overview of all import jobs started this session.'
)
const PAGE_ICON = <TasksIcon />

export { JobOverview }
