import React from 'react'
import { HashRouter } from 'react-router-dom'
import i18n from '@dhis2/d2-i18n'
import { CssReset, CircularLoader, ScreenCover } from '@dhis2/ui-core'

import { TaskContext } from './contexts/'
import { UserContext } from './contexts/'
import { useUser, useTasks } from './hooks/'

import styles from './App.module.css'
import { Sidebar } from './components/Sidebar'
import { Router } from './components/Router'

const App = () => {
    const { tasks, addTask, jobOverview, updateJobOverview } = useTasks()
    const { loading, error, user } = useUser()

    if (loading) {
        return (
            <ScreenCover dataTest="app-screen-cover">
                <CircularLoader dataTest="app-loader" />
            </ScreenCover>
        )
    } else if (error) {
        return (
            <div data-test="app-error">
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
        <HashRouter>
            <UserContext.Provider value={user}>
                <TaskContext.Provider
                    value={{ tasks, addTask, jobOverview, updateJobOverview }}
                >
                    <CssReset />

                    <div className={styles.container}>
                        <div className={styles.sidebar}>
                            <Sidebar />
                        </div>

                        <div className={styles.content}>
                            <Router />
                        </div>
                    </div>
                </TaskContext.Provider>
            </UserContext.Provider>
        </HashRouter>
    )
}

export default App
