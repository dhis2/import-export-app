import React, { useState } from 'react'
import { useDataEngine } from '@dhis2/app-runtime'

import { TaskContext } from '../../contexts/'

const jobEventQuery = {
    events: {
        resource: 'system/tasks/',
        id: ({ type, taskId }) => `${type}/${taskId}`,
    },
}

const jobSummaryQuery = {
    summary: {
        resource: 'system/taskSummaries/',
        id: ({ type, taskId }) => `${type}/${taskId}`,
    },
}

const refetchPeriod = 2000

const WithTasks = Component => props => {
    const engine = useDataEngine()
    const [tasks, setTasks] = useState({
        data: {},
        event: {},
        gml: {},
        metadata: {},
        jobOverview: undefined,
        addTask: (type, id, entry) => {
            setTasks(tasks => ({
                ...tasks,
                [type]: { ...tasks[type], [id]: entry },
            }))
            fetchEvents(type, id, entry)
        },
        updateJobOverview: val =>
            setTasks(tasks => ({
                ...tasks,
                jobOverview: {
                    ...tasks.jobOverview,
                    ...val,
                },
            })),
    })

    const fetchEvents = async (type, id, task) => {
        if (task.completed) {
            return
        }

        const newTask = { ...task }
        const { events, error } = await engine.query(jobEventQuery, {
            variables: {
                type: task.importType,
                taskId: task.id,
            },
        })

        if (error) {
            console.error('fetchEvents error: ', error)
            return
        }

        if (events && events.length) {
            const newEvents = events
                .filter(e => !task.events.some(te => te.id == e.uid))
                .map(e => ({
                    id: e.uid,
                    level: e.level,
                    text: e.message,
                    date: new Date(e.time),
                }))
            const errorEvent = newEvents.find(e => e.level == 'ERROR')
            if (errorEvent) {
                newTask.error = errorEvent.text
            }
            newTask.events = [...newTask.events, ...newEvents.reverse()]
            newTask.completed = events[0].completed
        }

        newTask.lastUpdated = new Date()

        if (!newTask.completed) {
            setTimeout(() => fetchEvents(type, id, newTask), refetchPeriod)
        } else {
            fetchSummary(type, id, newTask)
        }

        setTasks(tasks => ({
            ...tasks,
            [type]: { ...tasks[type], [id]: newTask },
        }))
    }

    const fetchSummary = async (type, id, task) => {
        const newTask = { ...task }

        const { summary, error } = await engine.query(jobSummaryQuery, {
            variables: {
                type: task.importType,
                taskId: task.id,
            },
        })

        if (error) {
            console.error('fetchSummary error: ', error)
            return
        }

        if (summary && summary.status == 'ERROR' && !newTask.error) {
            newTask.error = true
        }

        newTask.summary = summary
        setTasks(tasks => ({
            ...tasks,
            [type]: { ...tasks[type], [id]: newTask },
        }))
    }

    return (
        <TaskContext.Provider value={tasks}>
            <Component {...props} />
        </TaskContext.Provider>
    )
}

export { WithTasks }
