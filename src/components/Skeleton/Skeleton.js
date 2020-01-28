import React from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import s from './Skeleton.module.css'
import { Sidebar } from './Sidebar/'
import { withJobOverviewModal } from '../JobOverview'
import { ImportPages, ExportPages, Pages } from '../../utils/pages'

const Skeleton = ({ location }) => {
    return (
        <div className={s.container}>
            <div className={s.sidebar}>
                <Sidebar
                    pathname={location.pathname}
                    importPages={ImportPages}
                    exportPages={ExportPages}
                />
            </div>

            <div className={s.content}>
                <Switch>
                    {Pages.map(({ component, path }) => (
                        <Route path={path} key={path}>
                            {component}
                        </Route>
                    ))}
                    <Redirect from="*" to={ImportPages[0].path} />
                </Switch>
            </div>
        </div>
    )
}

Skeleton.propTypes = {
    location: PropTypes.object.isRequired,
}

const SkeletonRouter = withRouter(Skeleton)
const SkeletonRouterModal = withJobOverviewModal(SkeletonRouter)
export { SkeletonRouterModal as Skeleton }
