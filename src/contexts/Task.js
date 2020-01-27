import React from 'react'

const TaskContext = React.createContext(undefined)

const getNewestTask = tasks =>
    Object.keys(tasks)
        .map(k => tasks[k])
        .sort((a, b) => (a.created < b.created ? 1 : -1))[0]

export { TaskContext, getNewestTask }
