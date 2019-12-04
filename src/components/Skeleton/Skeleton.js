import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { CssReset, Divider, Menu, MenuItem } from '@dhis2/ui-core';

import s from './Skeleton.css';
import { ImportPages, ExportPages, Pages } from '../../utils/pages';
import StyledLink from './StyledLink';

const Skeleton = ({ location }) => {
    return (
        <div className="container">
            <Menu className="menu">
                <h3 className="section-title">Import</h3>

                {ImportPages.map(({ icon, name, path }) => (
                    <StyledLink to={path} key={path}>
                        <MenuItem
                            active={location.pathname == path}
                            icon={icon}
                            label={name}
                        />
                    </StyledLink>
                ))}
                <Divider />
                <h3 className="section-title">Export</h3>
                {ExportPages.map(({ icon, name, path }) => (
                    <StyledLink to={path} key={path}>
                        <MenuItem
                            active={location.pathname == path}
                            icon={icon}
                            label={name}
                        />
                    </StyledLink>
                ))}
            </Menu>

            <div className="content">
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
