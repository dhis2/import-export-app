import {
    CssVariables,
    CssReset,
    CircularLoader,
    ComponentCover,
} from '@dhis2/ui'
import React from 'react'
import { HashRouter } from 'react-router-dom'
import styles from './App.module.css'
import { Sidebar, Router } from './components/index.js'
import { UserContext, TaskContext } from './contexts/index.js'
import { useUser, useTasks } from './hooks/index.js'
import i18n from './locales/index.js'

const App = () => {
    const { tasks, addTask, jobOverview, updateJobOverview } = useTasks()
    const { loading, error, user } = useUser()

    const showApp = !loading && !error

    return (
        <>
            <CssReset />
            <CssVariables spacers colors />
            {loading && (
                <ComponentCover dataTest="app-screen-cover">
                    <CircularLoader dataTest="app-loader" />
                </ComponentCover>
            )}
            {error && (
                <div data-test="app-error">
                    <p>
                        {i18n.t(
                            'Something went wrong when loading the current user!'
                        )}
                    </p>
                    <p>{error.message}</p>
                </div>
            )}
            {showApp && (
                <HashRouter>
                    <UserContext.Provider value={user}>
                        <TaskContext.Provider
                            value={{
                                tasks,
                                addTask,
                                jobOverview,
                                updateJobOverview,
                            }}
                        >
                            <div className={styles.container}>
                                <div className={styles.sidebar}>
                                    <Sidebar />
                                </div>
                                <main className={styles.content}>
                                    <Router />
                                </main>
                            </div>
                        </TaskContext.Provider>
                    </UserContext.Provider>
                </HashRouter>
            )}
        </>
    )
}

export default App
