import React, { useContext } from 'react'

import styles from './JobOverview.module.css'
import { TaskContext } from '../../contexts/'
import { JobOverviewPage as p } from '../../utils/pages'
import { testIds } from '../../utils/testIds'
import { Page } from '../../components/Page'
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
            title={p.name}
            desc={p.description}
            icon={p.icon}
            dataTest={testIds.JobOverview.Page}
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

export { JobOverview }
