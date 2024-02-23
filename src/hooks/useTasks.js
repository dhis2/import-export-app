import { useDataEngine } from '@dhis2/app-runtime'
import { useState } from 'react'
import { allCategories } from '../utils/tasks.js'

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

const trackerEventQuery = {
    events: {
        resource: 'tracker/jobs/',
        id: ({ taskId }) => `${taskId}`,
    },
}

const trackerSummaryQuery = {
    summary: {
        resource: 'tracker/jobs/',
        id: ({ taskId }) => `${taskId}/report`,
    },
}

const defaultTasks = {
    data: {},
    event: {},
    gml: {},
    earthengine: {},
    geojson: {},
    metadata: {},
    tei: {},
}
const defaultJobOverview = {
    activeTypes: allCategories,
    selectedJob: undefined,
}
const defaultRefetchPeriod = 2000

const createFetchEvents =
    (engine, setTasks, fetchSummary) => (type, id, task) => {
        const fetchEvents = async () => {
            console.debug('[fetch event]', type, id, task)
            if (task.completed) {
                return
            }

            const newTask = { ...task }
            const query =
                task.importType === 'TRACKER_IMPORT_JOB'
                    ? trackerEventQuery
                    : jobEventQuery

            const response = await engine.query(query, {
                variables: {
                    type: task.importType,
                    taskId: task.id,
                },
            })

            const { events, error } = response

            if (error) {
                console.error('fetchEvents error: ', error)
                return
            }

            if (events && events.length) {
                const newEvents = events
                    .filter((e) => !task.events.some((te) => te.id == e.uid))
                    .map((e) => ({
                        id: e.uid,
                        level: e.level,
                        text: e.message,
                        date: new Date(e.time),
                    }))
                const errorEvent = newEvents.find((e) => e.level == 'ERROR')
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

            setTasks((tasks) => ({
                ...tasks,
                [type]: { ...tasks[type], [id]: newTask },
            }))
        }
        fetchEvents()
    }

const createFetchSummary = (engine, setTasks) => async (type, id, task) => {
    const newTask = { ...task }

    // we could still keep one query here (the jobs query), but tracker provides a facade to these
    // and even though this branches the logic unnecessarily, we should stick to
    // trackers' endpoint for tracker imports and they could abstract some job-related details
    // more details here: https://docs.dhis2.org/en/develop/using-the-api/dhis-core-version-master/tracker.html#webapi_nti_import_summary
    const query =
        task.importType === 'TRACKER_IMPORT_JOB'
            ? trackerSummaryQuery
            : jobSummaryQuery

    const response = await engine.query(query, {
        variables: {
            type: task.importType,
            taskId: task.id,
        },
    })

    const { summary, error } = response

    if (error) {
        console.error('fetchSummary error: ', error)
        return
    }

    if (summary && summary.status == 'ERROR' && !newTask.error) {
        newTask.error = true
    }

    newTask.summary = summary
    setTasks((tasks) => ({
        ...tasks,
        [type]: { ...tasks[type], [id]: newTask },
    }))
}

const createAddTask = (setTasks, fetchEvents) => (type, id, entry) => {
    setTasks((tasks) => ({
        ...tasks,
        [type]: { ...tasks[type], [id]: entry },
    }))
    fetchEvents(type, id, entry)
}

const createUpdateJobOverview = (setJobOverview) => (val) => {
    setJobOverview((jobOverview) => ({
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
