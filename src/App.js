import React from 'react'
import { HashRouter as Router } from 'react-router-dom'

import { TaskContext } from './contexts/'
import { WithUser } from './components/WithUser'
import { WithSchemes } from './components/WithSchemes'
import { useTasks } from './hooks/useTasks'
import { Skeleton } from './components/Skeleton'

const MyApp = () => {
    const taskContextValue = useTasks()

    return (
        <Router>
            <TaskContext.Provider value={taskContextValue}>
                <Skeleton />
            </TaskContext.Provider>
        </Router>
    )
}

export default WithUser(WithSchemes(MyApp))
