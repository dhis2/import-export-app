import React, { useContext } from 'react'

import s from './JobOverview.module.css'
import { TaskContext } from '../../contexts/'
import { JobOverviewPage as p } from '../../utils/pages'
import { testIds } from '../../utils/testIds'
import { Page } from '../../components/Page'
import {
    JobOverview as JobOverviewComponent,
    categoryTypes,
} from '../../components/JobOverview'

const allCategories = categoryTypes.map(({ importType }) => importType)
const initialJobOverview = {
    activeTypes: allCategories,
    selectedJob: undefined,
}

const JobOverview = () => {
    const { jobOverview, updateJobOverview } = useContext(TaskContext)

    const setActiveTypes = types => {
        updateJobOverview({
            ...jobOverview,
            activeTypes: types,
        })
    }
    const setSelectedJob = job => {
        updateJobOverview({
            ...jobOverview,
            selectedJob: job,
        })
    }

    if (!jobOverview) {
        updateJobOverview(initialJobOverview)
    }

    const activeTypes = jobOverview
        ? jobOverview.activeTypes
        : initialJobOverview.activeTypes
    const selectedJob = jobOverview
        ? jobOverview.selectedJob
        : initialJobOverview.selectedJob

    return (
        <Page
            title={p.name}
            desc={p.description}
            icon={p.icon}
            dataTest={testIds.JobOverview.Page}
        >
            <div className={s.container}>
                <JobOverviewComponent
                    activeTypes={activeTypes}
                    setActiveTypes={setActiveTypes}
                    selectedJob={selectedJob}
                    setSelectedJob={setSelectedJob}
                    noCard
                />
            </div>
        </Page>
    )
}

export { JobOverview }
