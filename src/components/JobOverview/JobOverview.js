import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Button, Chip, Menu, MenuItem } from '@dhis2/ui-core'

import s from './JobOverview.module.css'
import { TaskContext, categoryTypes } from '../../contexts/'
import { testIds } from '../../utils/testIds'
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
    if (!selectedJob && allTasks.length > 0) {
        setSelectedJob(allTasks[0])
    }

    if (!selectedJob) {
        return <p>{i18n.t('No jobs started yet.')}</p>
    }

    return (
        <div className={s.container} data-test={testIds.JobOverview.container}>
            <div className={s.items} data-test={testIds.JobOverview.items}>
                <Menu className={s.Menu}>
                    <div
                        className={s.chips}
                        data-test={testIds.JobOverview.chips}
                    >
                        {categoryTypes.map(({ key, importType, label }) => (
                            <Chip
                                onClick={() => onChipClick(importType)}
                                selected={activeTypes.includes(importType)}
                                key={key}
                                dataTest={`${testIds.JobOverview.chips}-${key}`}
                            >
                                {label}
                            </Chip>
                        ))}
                    </div>
                    {filteredTasks.map(t => (
                        <MenuItem
                            key={`${testIds.JobOverview.items}-${t.id}`}
                            active={selectedJob.id == t.id}
                            label={<MenuLabel task={t} />}
                            onClick={() => setSelectedJob(t)}
                            icon={categoryTypesObj[t.importType].icon}
                        />
                    ))}
                </Menu>
            </div>
            <div
                className={s.summary}
                data-test={testIds.JobOverview.JobSummary}
            >
                <JobSummary
                    task={selectedJob}
                    dataTest={testIds.JobSummary.container}
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
