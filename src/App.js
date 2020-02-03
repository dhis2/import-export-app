import React from 'react'
import { HashRouter as Router } from 'react-router-dom'

import { WithUser } from './components/WithUser'
import { WithSchemes } from './components/WithSchemes'
import { WithTasks } from './components/WithTasks'
import { Skeleton } from './components/Skeleton'

const MyApp = () => {
    return (
        <Router>
            <Skeleton />
        </Router>
    )
}

export default WithUser(WithSchemes(WithTasks(MyApp)))
