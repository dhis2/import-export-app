import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import s from './Skeleton.module.css';
import { Sidebar } from './Sidebar/';
import { ImportPages, ExportPages, Pages } from '../../utils/pages';

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
                </Switch>
            </div>
        </div>
    );
};

const SkeletonRouter = withRouter(Skeleton);
export { SkeletonRouter as Skeleton };
