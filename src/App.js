import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import i18n from '@dhis2/d2-i18n'
import { CssReset, CircularLoader, ScreenCover } from '@dhis2/ui-core'

import { testIds } from './utils/testIds'
import { TaskContext } from './contexts/'
import { UserContext } from './contexts/'
import { WithSchemes } from './components/WithSchemes'
import { useUser, useTasks } from './hooks/'
import { Skeleton } from './components/Skeleton'

const App = () => {
    const taskContextValue = useTasks()
    const { loading, error, user } = useUser()

    if (loading) {
        return (
            <ScreenCover dataTest={testIds.App.ScreenCover}>
                <CircularLoader dataTest={testIds.App.Loader} />
            </ScreenCover>
        )
    } else if (error) {
        return (
            <div data-test={testIds.App.Error}>
                <p>
                    {i18n.t(
                        'Something went wrong when loading the current user!'
                    )}
                </p>
                <p>{error.message}</p>
            </div>
        )
    }

    return (
        <Router>
            <UserContext.Provider value={user}>
                <TaskContext.Provider value={taskContextValue}>
                    <CssReset />
                    <Skeleton />
                </TaskContext.Provider>
            </UserContext.Provider>
        </Router>
    )
}

export default WithSchemes(App)
