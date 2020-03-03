import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'

import { ImportPages, Pages } from '../../utils/pages'

const Router = () => {
    const location = useLocation()

    return (
        <Switch>
            {Pages.map(({ component: Component, path }) => (
                <Route path={path} key={path}>
                    <Component query={location.query} />
                </Route>
            ))}
            <Redirect from="*" to={ImportPages[0].path} />
        </Switch>
    )
}

export { Router }
