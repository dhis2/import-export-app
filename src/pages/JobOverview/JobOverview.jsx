import i18n from '@dhis2/d2-i18n'
import React, { useContext } from 'react'
import {
    JobOverview as JobOverviewComponent,
    Page,
    TasksIcon,
} from '../../components/index.js'
import { TaskContext } from '../../contexts/index.js'
import styles from './JobOverview.module.css'

const JobOverview = () => {
    const { jobOverview, updateJobOverview } = useContext(TaskContext)

    const setActiveTypes = (types) => {
        const selectedJob = jobOverview.selectedJob
        const job =
            selectedJob && types.includes(selectedJob.importType)
                ? selectedJob
                : null
        updateJobOverview({
            activeTypes: types,
            selectedJob: job,
        })
    }
    const setSelectedJob = (job) => {
        updateJobOverview({
            selectedJob: job,
        })
    }

    return (
        <Page
            title={PAGE_NAME}
            desc={PAGE_DESCRIPTION}
            icon={PAGE_ICON}
            limitWidth={false}
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
