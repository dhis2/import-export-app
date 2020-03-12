import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Button, Chip, Menu, MenuItem } from '@dhis2/ui-core'

import styles from './JobOverview.module.css'
import { TaskContext, categoryTypes } from '../../contexts/'
import { JobSummary } from '../JobSummary/'
import { categoryTypesObj, jobToPath } from './helper'
import { MenuLabel } from './MenuLabel'

const JobOverview = ({
    activeTypes,
    setActiveTypes,
    selectedJob,
    setSelectedJob,
}) => {
    const { tasks } = useContext(TaskContext)

    const onChipClick = key => {
        if (activeTypes.includes(key)) {
            setActiveTypes([...activeTypes].filter(k => k != key))
        } else {
            setActiveTypes([...activeTypes, key])
        }
    }

    // all tasks sorted by type, createdAt (descending)
    const allTasks = categoryTypes
        .map(({ key: type }) =>
            Object.keys(tasks[type]).map(id => tasks[type][id])
        )
        .flat()
        .sort((a, b) => {
            if (a.importType > b.importType) return -1
            if (a.createdAt > b.createdAt) return -1
        })

    const filteredTasks = allTasks.filter(t =>
        activeTypes.includes(t.importType)
    )

    // set selected job to first job if
    // first time user visits the job overview page
    useEffect(() => {
        if (!selectedJob && allTasks.length > 0) {
            setSelectedJob(allTasks[0])
        }
    }, [])

    if (!selectedJob) {
        return <p>{i18n.t('No jobs started yet.')}</p>
    }

    return (
        <div className={styles.container} data-test="job-overview-container">
            <div className={styles.items} data-test="job-overview-tasks">
                <Menu className={styles.Menu}>
                    <div
                        className={styles.chips}
                        data-test="job-overview-chips"
                    >
                        {categoryTypes.map(({ key, importType, label }) => (
                            <Chip
                                onClick={() => onChipClick(importType)}
                                selected={activeTypes.includes(importType)}
                                key={key}
                                dataTest={`job-overview-chips-${key}`}
                            >
                                {label}
                            </Chip>
                        ))}
                    </div>
                    {filteredTasks.map(t => (
                        <MenuItem
                            key={`job-overview-tasks-${t.id}`}
                            active={selectedJob.id == t.id}
                            label={<MenuLabel task={t} />}
                            onClick={() => setSelectedJob(t)}
                            icon={categoryTypesObj[t.importType].icon}
                        />
                    ))}
                </Menu>
            </div>
            <div className={styles.summary} data-test="job-overview-summary">
                <JobSummary
                    task={selectedJob}
                    dataTest="job-summary-container"
                    showFileDetails={false}
                    showJobDetails={true}
                />
                <Link to={jobToPath(selectedJob)}>
                    <Button primary>{i18n.t('Recreate job')}</Button>
                </Link>
            </div>
        </div>
    )
}

JobOverview.propTypes = {
    activeTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    setActiveTypes: PropTypes.func.isRequired,
    setSelectedJob: PropTypes.func.isRequired,
    selectedJob: PropTypes.object,
}

export { JobOverview, categoryTypes }
