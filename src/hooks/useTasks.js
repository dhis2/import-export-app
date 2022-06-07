import { useDataEngine } from '@dhis2/app-runtime'
import { useState } from 'react'
import { allCategories } from '../utils/tasks'

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

const defaultTasks = {
    data: {},
    event: {},
    gml: {},
    geojson: {},
    metadata: {},
    tei: {},
}
const defaultJobOverview = {
    activeTypes: allCategories,
    selectedJob: undefined,
}
const defaultRefetchPeriod = 2000

const createFetchEvents = (engine, setTasks, fetchSummary) => (
    type,
    id,
    task
) => {
    const fetchEvents = async () => {
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
            setTimeout(
                () => fetchEvents(type, id, newTask),
                defaultRefetchPeriod
            )
        } else {
            fetchSummary(type, id, newTask)
        }

        setTasks(tasks => ({
            ...tasks,
            [type]: { ...tasks[type], [id]: newTask },
        }))
    }
    fetchEvents()
}

const createFetchSummary = (engine, setTasks) => async (type, id, task) => {
    const newTask = { ...task }

    const { summary, error } = await engine.query(jobSummaryQuery, {
        variables: {
            type: task.importType,
            taskId: task.id,
        },
    })

    console.log('summary', type, id, task, jobSummaryQuery, summary)

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

const createAddTask = (setTasks, fetchEvents) => (type, id, entry) => {
    setTasks(tasks => ({
        ...tasks,
        [type]: { ...tasks[type], [id]: entry },
    }))
    fetchEvents(type, id, entry)
}

const createUpdateJobOverview = setJobOverview => val => {
    setJobOverview(jobOverview => ({
        ...jobOverview,
        ...val,
    }))
}

const useTasks = () => {
    const engine = useDataEngine()
    const [tasks, setTasks] = useState(defaultTasks)
    const [jobOverview, setJobOverview] = useState(defaultJobOverview)

    const fetchSummary = createFetchSummary(engine, setTasks)
    const fetchEvents = createFetchEvents(engine, setTasks, fetchSummary)
    const addTask = createAddTask(setTasks, fetchEvents)
    const updateJobOverview = createUpdateJobOverview(setJobOverview)

    return { tasks, addTask, jobOverview, updateJobOverview }
}

export { useTasks }
