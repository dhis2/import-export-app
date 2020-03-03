import React from 'react'
import { HashRouter } from 'react-router-dom'
import i18n from '@dhis2/d2-i18n'
import { CssReset, CircularLoader, ScreenCover } from '@dhis2/ui-core'

import { testIds } from './utils/testIds'
import { TaskContext } from './contexts/'
import { UserContext } from './contexts/'
import { useUser, useTasks } from './hooks/'

import s from './App.module.css'
import { Sidebar } from './components/Sidebar'
import { Router } from './components/Router'
import { ImportPages, ExportPages, JobOverviewPage } from './utils/pages'

const App = () => {
    const { tasks, addTask, jobOverview, updateJobOverview } = useTasks()
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
        <HashRouter>
            <UserContext.Provider value={user}>
                <TaskContext.Provider
                    value={{ tasks, addTask, jobOverview, updateJobOverview }}
                >
                    <CssReset />

                    <div className={s.container}>
                        <div className={s.sidebar}>
                            <Sidebar
                                importPages={ImportPages}
                                exportPages={ExportPages}
                                jobOverviewPage={JobOverviewPage}
                            />
                        </div>

                        <div className={s.content}>
                            <Router />
                        </div>
                    </div>
                </TaskContext.Provider>
            </UserContext.Provider>
        </HashRouter>
    )
}

export default App
